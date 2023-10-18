from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio

from message.parsers.main import parse_price_maiki, parce_price_vse_maiki


class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.parse_active_maiki = False
        self.parse_active_test = False
        self.parse_task_maiki = None
        self.parse_task_test = None

    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("chat", self.channel_name)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("chat", self.channel_name)
        self.parse_active_maiki = False
        self.parse_active_test = False

        if self.parse_task_maiki:
            self.parse_task_maiki.cancel()
            self.parse_task_maiki = None

        if self.parse_task_test:
            self.parse_task_test.cancel()
            self.parse_task_test = None

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        command = text_data_json.get('command')

        if command == 'parse-maiki':
            if not self.parse_active_maiki:
                self.parse_active_maiki = True
                await self.send(text_data=json.dumps({'status': 'Parsing maiki started'}))
                self.parse_task_maiki = asyncio.create_task(self.start_parse_maiki_loop())
        elif command == 'parse-test':
            if not self.parse_active_test:
                self.parse_active_test = True
                await self.send(text_data=json.dumps({'status': 'Parsing test started'}))
                self.parse_task_test = asyncio.create_task(self.start_parse_test_loop())
        elif command == 'stop-parse-maiki':
            self.parse_active_maiki = False
            if self.parse_task_maiki:
                self.parse_task_maiki.cancel()
                await self.send(text_data=json.dumps({'status': 'Parsing maiki stopped'}))
        elif command == 'stop-parse-test':
            self.parse_active_test = False
            if self.parse_task_test:
                self.parse_task_test.cancel()
                await self.send(text_data=json.dumps({'status': 'Parsing test stopped'}))

    async def start_parse_maiki_loop(self):
        for price in parse_price_maiki():
            if not self.parse_active_maiki:
                break
            await self.send(text_data=json.dumps({'price': price}))
            await asyncio.sleep(0.5)

        self.parse_task_maiki.cancel()
        await self.send(text_data=json.dumps({'status': 'Parsing maiki stopped'}))

    async def start_parse_test_loop(self):
        for price in parce_price_vse_maiki():
            if not self.parse_active_test:
                break
            await self.send(text_data=json.dumps({'price': price}))
            await asyncio.sleep(0.5)

        self.parse_task_test.cancel()
        await self.send(text_data=json.dumps({'status': 'Parsing test stopped'}))
