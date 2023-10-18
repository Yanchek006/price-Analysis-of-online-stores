FROM python:3.11-alpine3.17

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./backend/requirements.txt /temp/requirements.txt
COPY ./backend /backend
WORKDIR backend

RUN apk add libffi-dev

RUN apk add --no-cache postgresql-client build-base postgresql-dev && \
    pip install --no-cache-dir -r /temp/requirements.txt