class MosaicCreator {
    constructor(options) {
        this.tileHeight = TILE_HEIGHT;
        this.tileWidth = TILE_WIDTH;

        this.maxWidth = options.maxWidth;
        this.maxHeight = options.maxHeight;
    }

    getMosaic(data) {
        // this.resizeImage(data);
        this.calculateAverageColor(data);
    }

    calculateAverageColor(data) {
        let imageData = data.imageData;
        
        for(let i = 0; i < imageData.length - 4; i += 4) {
            var red = imageData[i];
            var green = imageData[i+1];
            var blue = imageData[i+2];
            var alpha = imageData[i+3];

            console.log(red, green, blue, alpha)
        }
    }

    // resizeImage(data) {
    //     let image = data.image;

    //     if(image.width < this.maxWidth && image.height < this.maxHeight){
    //         return image;
    //     }

    //     if(image.width > this.maxWidth) {

    //     }
    // }
}

if (exports) {
    exports.MosaicCreator = MosaicCreator;
}