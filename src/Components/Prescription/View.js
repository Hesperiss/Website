import React from "react";
import Navbar from "../Shared/Navbar";
import PrescriptionApi from "./Prescription";
import KwiliApi from '../Shared/Api/api';
//import NotLogged from "../Shared/LogHandling/NotLogged";
import { Figure, Button, Col } from "react-bootstrap";
import ExifOrientationImg from 'react-exif-orientation-img'
import axios from 'axios';

import classes from './Prescription.scss';
// import stylesClasses from '../../Styles.scss'

export default class Prescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileZoom: false,
            fileNames: [],
            files: [],
            fileZoomed: null,
            image: "",
            selectedFile: null,
            displaySelected: false,
        };
        this.refreshFiles = (response) => {
            if (response != null) {
                this.setState({
                    fileNames: response.data,
                });
                if (typeof this.state.fileNames !== "string") {
                    let fileNames = this.state.fileNames;
                    let docFiles = [];
                    fileNames.Files.forEach(function (item) {
                        docFiles.push(PrescriptionApi.getFile(item.name))
                    });
                    this.setState({
                        files: docFiles,
                    });
                    console.log(this.state.files)
                }
            }
            else {
                console.log("Error get")
            }
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    componentDidMount() {
        if (KwiliApi.isConnected()) {
            PrescriptionApi.getFileNames().then(this.refreshFiles);
        }
    }

    handleClick(e, data) {
        if (!this.state.fileZoom) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
            if (e != null)
            this.setState({
                fileZoomed: data
            });
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            fileZoom: !prevState.fileZoom,
        }));
    }

    handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }
        document.getElementById("overlay").style.display = "none";
        this.handleClick();
    }

    Display() {
        document.getElementById("overlay").style.display = "block";
        return(
            <div
                style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <ExifOrientationImg
                    width="550"
                    alt="prescription"
                    src={this.state.fileZoomed}
                />
            </div>
        )
    }

    onChange(e) {
        this.setState({
            selectedFile: e.target.files[0],
            displaySelected: true,
        })
    }

    fileUploadHandler() {
        console.log("click upload");
        const fd = new FormData();
        console.log(this.state.selectedFile);
        fd.append("img", this.state.selectedFile);
        axios.post(PrescriptionApi.upload(), fd).then(res => {
            console.log(res);
        });
        window.location.reload();
    }


    render() {
      // A REMOVE PLUS TARD
        // if (!KwiliApi.isConnected())
        //     return (<NotLogged/>);
        const items = [];
        for (const [index, value] of this.state.files.entries()) {
            items.push(
                <Button variant="light" key={index} id='toto' onClick={((e) => this.handleClick(e, value))}>
                    <Figure>
                        <Figure.Image
                            src={value}
                            width="200"
                            fluid
                        />
                    </Figure>
                </Button>
            )
        }

        return (
            <div>
                <div className={classes.overlay}>
                    {this.state.fileZoom && (
                        <div ref={node => { this.node = node; }}>
                            {this.Display()}
                        </div>
                    )}
                </div>
                <div>
                    <Navbar/>
                    <div className="container ">
                        <div className="row align-items-center">
                            <div className={classes.imageUpload}>
                                <label htmlFor="file-input">
                                    <img src="http://www.pngall.com/wp-content/uploads/2/Upload-PNG.png" alt="upload"/>
                                </label>
                                <input id="file-input" type="file" name="file" style={{display:"none"}} onChange={(e)=>this.onChange(e)}/>
                            </div>
                            <Col xs={12} md={8}>
                                <Button size="lg" onClick={()=>this.fileUploadHandler()}>Confirm</Button>
                            </Col>
                        </div>
                        {this.state.displaySelected && (
                            <div>
                                {this.state.selectedFile.name} is loaded, please confirm to upload.
                            </div>
                        )}
                    </div>
                    <br/>
                    <br/>
                    {this.state.files.length === 0 && (
                        <div style={{fontFamily:"trebuchet", fontSize:"2em",position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                            You have no prescription uploaded yet !</div>
                    )}
                    <div className="container ">
                        <div className="row">
                            {items}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
