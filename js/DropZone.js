class DropZone {
    constructor(options) {
        if(!options.zone) {
            throw new Error('Zone is not defined');
        }

        this.renderArea = options.renderArea || document.body;
        this.renderOriginalImage = options.renderOriginalImage;
        this.zone = options.zone;
        this.zone.addEventListener('dragover', this.onDragOver.bind(this));
        this.zone.addEventListener('drop', this.onDrop.bind(this));
    }

    onDragOver(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy'; 
    }

    onDrop(e) {
        e.stopPropagation();
        e.preventDefault();

        let image = e.dataTransfer.files[0];

        let isImage = image.type.indexOf('image') !== -1;  
        if(!isImage) {
            throw new Error('The file isn\'t an image');
        }

        if(this.renderOriginalImage) {
            this.renderImage(image);   
        }

        this.createMosaic(image);
    }

    renderImage(image) {
        let reader = new FileReader();
        reader.onload = (file => {            
            return e => {                
                let imgElement = new Image();
                imgElement.src = e.target.result;
                imgElement.className = 'original-image';
                this.renderArea.appendChild(imgElement);         
            }
        })(image);

        reader.readAsDataURL(image);        
    }

    createMosaic(image) {
        let mc = new MosaicCreator({ image });

    }
}

if(exports) {
    exports.DropZone = DropZone;
}