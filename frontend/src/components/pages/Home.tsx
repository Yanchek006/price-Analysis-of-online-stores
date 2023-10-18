import {CSSProperties, FC} from "react";
import "./style.css"
import {NavLink} from "react-router-dom";

const Home: FC = () => {
    const style: CSSProperties = {width: "80%", height: 300, borderRadius: 21}
    return (
        <>
            <main>
                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center " style={{
                    position: 'relative',
                }}>
                    <div className="col-md-5 p-lg-5 mx-auto my-5">
                        <h1 className="display-4 fw-normal">Price analysis</h1>
                        <p className="lead fw-normal">We are engaged in the analysis of prices for goods and you can
                            already use our services, it is enough to register and already in your personal account you
                            can use our functionality</p>
                        <NavLink className="btn btn-outline-success" to={"/register"}>go register</NavLink>
                    </div>
                    <div className="product-device shadow-sm d-none d-md-block"></div>
                    <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                    <div className="bg-image" style={{
                        backgroundImage: "url('http://localhost/react/img/img.png')",
                    }}></div>
                </div>



                <div className="container px-4 py-5" id="custom-cards">
                    <h2 className="pb-2 border-bottom">Why you should choose us</h2>

                    <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                        <div className="col">
                            <div
                                className="card card-cover h-100 overflow-hidden rounded-4"
                                style={{backgroundImage: "url('http://localhost/react/img/2.png')"}}>
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-light-emphasis text-shadow-1">
                                    <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Displaying parsing graph in
                                        real-time</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div
                                className="card card-cover h-100 overflow-hidden text-secondary-emphasis rounded-4"
                                style={{backgroundImage: "url('http://localhost/react/img/1.png')"}}>
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-light-emphasis text-shadow-1">
                                    <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Comparative graph</h2>
                                </div>
                            </div>

                        </div>

                        <div className="col">
                            <div
                                className="card card-cover h-100 overflow-hidden rounded-4"
                                style={{backgroundImage: "url('http://localhost/react/img/3.png')"}}>
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-light-emphasis text-shadow-1">
                                    <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">User-friendly interface</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );

}
export default Home;