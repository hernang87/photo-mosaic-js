let dropEvent = new Event('imageDropped', { image: null });

const dropZone = new DropZone({
    zone: document.getElementById('drop-zone'),
    dropEvent
});

document.getElementById('file').addEventListener('change', e => {
    let image = e.target.files[0];

    let isImage = image.type.indexOf('image') !== -1;  
    if(!isImage) {
        throw new Error('The file isn\'t an image');
    }

    dropEvent.image = image;
    document.dispatchEvent(dropEvent);
});

document.addEventListener('imageDropped', e => {    
    let mc = new MosaicCreator();
    mc.getMosaic(e.image);
});


