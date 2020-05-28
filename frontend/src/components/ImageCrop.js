import React, { Component } from 'react'
import ReactCrop from 'react-image-crop'
import {base64StringtoFile, extractImageFileExtensionFromBase64, image64toCanvasRef} from '../firebase/utils'
import FadeIn from 'react-fade-in';
import '../component_styles/ImageCrop.css';

    const imageMaxSize = 1000000000 // bytes
    const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
    const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
    class ImgDropAndCrop extends Component {
        constructor(props){
            super(props)
            this.imagePreviewCanvasRef = React.createRef()
            this.fileInputRef = React.createRef()
            this.state = {
                imgSrc: null,
                imgSrcExt: null,
                fade: false,
                crop: {
                    x: 175, y: 150, aspect: 1 / 1, width: 300, height: 300
                },
            }
        }

    componentDidUpdate() {
        if (this.props.pictureHasBeenUploaded === 'true') {
            this.handleFileSelect()
        }
    }

    verifyFile = (files) => {
        if (files && files.length > 0){
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                this.props.setPictureHasBeenUploaded(false)
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)){
                this.props.setPictureHasBeenUploaded(false)
                alert("This file is not allowed. Please upload an image.")
                return false
            }
            return true
        }
    }

    handleOnCropChange = (crop) => {
        this.setState({crop:crop})
    }

    handleOnCropComplete = (crop) =>{
        const canvasRef = this.imagePreviewCanvasRef.current
        const {imgSrc}  = this.state
        image64toCanvasRef(canvasRef, imgSrc, crop)
    }

    handleDownloadClick = (event) => {
        event.preventDefault()
        const rand = new Array(30).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36)[Math.random()<.5?"toString":"toUpperCase"]();});
        // const {imgSrc}  = this.state
        const canvasRef = this.imagePreviewCanvasRef.current
        const {imgSrcExt} =  this.state
        const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)
        const myFilename = `${rand}_file.` + imgSrcExt
        const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
        // download file
        // downloadBase64File(imageData64, myFilename)
        this.props.handlePicUpload(myNewCroppedFile)
    }

    handleFileSelect = () => {
        const files = this.props.profilePic
        if (files && files.length > 0){
              const isVerified = this.verifyFile(files)
             if (isVerified){
                 // imageBase64Data 
                 const currentFile = files[0]
                 const myFileItemReader = new FileReader()
                 myFileItemReader.addEventListener("load", () => {
                     // console.log(myFileItemReader.result)
                     const myResult = myFileItemReader.result
                     this.setState({
                         imgSrc: myResult,
                         imgSrcExt: extractImageFileExtensionFromBase64(myResult),
                         fade: true
                     })
                 }, false)
                 myFileItemReader.readAsDataURL(currentFile)
             }
        }
    }

  render () {
    const {imgSrc} = this.state
    const {fade} = this.state
    return (
        fade ? (<FadeIn className='fade-in' delay={150} transitionDuration={700}>
                    <div className={`useless-container${this.props.pictureHasBeenUploaded}`}>
                        <div className='overall-container'>
                            <div className='content-container'>
                                <div className='header-container'>
                                    <h1>Please crop your profile picture</h1>
                                    <h2 className='second-header'>so it doesn't look like shit on my website!</h2>
                                    <button onClick={this.handleDownloadClick}>Crop</button>
                                </div>
                                <div className='image-container'>
                                    <ReactCrop 
                                        className='profilePicCrop' 
                                        circularCrop={true} 
                                        src={imgSrc} 
                                        crop={this.state.crop} 
                                        minWidth={300}
                                        minHeight={300}
                                        onComplete = {this.handleOnCropComplete}
                                        onChange={this.handleOnCropChange}/>
                                </div>
                            </div>
                        </div>
                        <div className='canvas-container'><canvas className='previewCanvas'ref={this.imagePreviewCanvasRef}></canvas></div>
                    </div>
                </FadeIn>) : null
    )
  }
}

export default ImgDropAndCrop