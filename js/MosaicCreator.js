class MosaicCreator {
    constructor(options = {}) {
        this.tileHeight = options.tileHeight || TILE_HEIGHT;
        this.tileWidth = options.tileWidth || TILE_WIDTH;

        this.maxWidth = options.maxWidth || 600;
        this.maxHeight = options.maxHeight || 600;
        this.detail = options.detail || 5;
        this.pixelInterval = options.pixelInterval || 5;
    }

    getMosaic(image) {
        let reader = new FileReader();
        reader.onload = (e) => this.createMosaic(e.target.result);        
        reader.readAsDataURL(image);  
    }

    createMosaic(data) {     
        const image = new Image();
        image.src = data;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;
        
        const mosaic = document.createElement('canvas');
        const mosaicCtx = mosaic.getContext('2d');
        mosaic.width = image.width;
        mosaic.height = image.height;
        mosaic.className = 'result-canvas';

        const columns = Math.ceil(image.width / this.tileWidth);
        const rows = Math.ceil(image.height / this.tileHeight);           

        for(let y = 0; y < rows; y++) {
            let rowTiles = []
            for(let x = 0; x < columns; x++) {           
                let deltaX = x * this.tileWidth;
                let deltaY = y * this.tileHeight;              

                context.drawImage(image, deltaX, deltaY, this.tileWidth, this.tileHeight, 0, 0, this.tileWidth, this.tileHeight);   

                let tile = context.getImageData(0, 0, this.tileWidth, this.tileHeight);                                                               

                let rgb = this.getTileColor(tile);
                
                rowTiles.push({
                    fillStyle: `rgb(${rgb.r},${rgb.g},${rgb.b}`,
                    deltaX, deltaY
                });                            
            }

            for(let tile of rowTiles) {
                mosaicCtx.fillStyle = tile.fillStyle;
                mosaicCtx.fillRect(tile.deltaX, tile.deltaY, this.tileWidth, this.tileHeight);
            }
        }        

        document.querySelector('.arrow').classList.add('visible');        
        document.body.appendChild(mosaic);
    }

    getTileColor(tile) {                          
        let rgb = { r: 0, g: 0, b: 0 };              
        
        let data = tile.data;              
        let totalPixels = 0;
        let currentPixel = -this.pixelInterval + 1;
        while ((currentPixel += this.pixelInterval * 4) < data.length) {              
              rgb.r += data[currentPixel];
              rgb.g += data[currentPixel + 1];
              rgb.b += data[currentPixel + 2];
              totalPixels++;
          }
          
          rgb.r = Math.floor(rgb.r / totalPixels);
          rgb.g = Math.floor(rgb.g / totalPixels);
          rgb.b = Math.floor(rgb.b / totalPixels);          

          return rgb;
    }
}

if (exports) {
    exports.MosaicCreator = MosaicCreator;
}