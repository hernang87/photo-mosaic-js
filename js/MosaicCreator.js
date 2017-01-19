class MosaicCreator {
    constructor(options) {
        if(!options.image) {
            throw new Error('No image was received');
        }

        this.tileHeight = TILE_HEIGHT;
        this.tileWidth = TILE_WIDTH;
    }

    getMosaic() {

    }
}

if (exports) {
    exports.MosaicCreator = MosaicCreator;
}