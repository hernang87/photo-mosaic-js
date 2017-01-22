class DropZone {
    constructor(options = {}) {
        if(!options.zone) {
            throw new Error('Zone is not defined');
        }

        this.zone = options.zone;
        this.dropEvent = options.dropEvent || new Event('dropped');
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

        this.dropEvent.image = image;

        document.dispatchEvent(this.dropEvent);
    }
}

if(exports) {
    exports.DropZone = DropZone;
}