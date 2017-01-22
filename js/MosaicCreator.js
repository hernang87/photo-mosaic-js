class MosaicCreator {
    constructor(options = {}) {
        this.tileHeight = options.tileHeight || TILE_HEIGHT;
        this.tileWidth = options.tileWidth || TILE_WIDTH;
        this.pixelInterval = options.pixelInterval || 5;
    }

    getMosaic(image) {
        let reader = new FileReader();
        reader.onload = (e) => this.createMosaic(e.target.result);        
        reader.readAsDataURL(image);  
    }

    createMosaic(data) {     
        // Got imageData, creating image object to get size
        const image = new Image();
        image.src = data;

        // Helper canvas, will not be rendered
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;
        
        // Mosaic canvas, where the final mosaic will be rendered
        const mosaic = document.createElement('canvas');
        const mosaicCtx = mosaic.getContext('2d');
        mosaic.width = image.width;
        mosaic.height = image.height;
        mosaic.className = 'result-canvas';

        // Get how many rows and columns the image has
        const columns = Math.ceil(image.width / this.tileWidth);
        const rows = Math.ceil(image.height / this.tileHeight);           

        for(let y = 0; y < rows; y++) {
            let rowTiles = []
            for(let x = 0; x < columns; x++) {           
                let deltaX = x * this.tileWidth;
                let deltaY = y * this.tileHeight;              

                // Draw the tile on the helper canvas to get it's binary data
                context.drawImage(image, deltaX, deltaY, this.tileWidth, this.tileHeight, 0, 0, this.tileWidth, this.tileHeight);   

                // Get binary data of current tile
                let tile = context.getImageData(0, 0, this.tileWidth, this.tileHeight);                                                               

                let rgb = this.getTileColor(tile);
                
                // We want to render one row at a time, so we need an array 
                // of the tiles to be rendered there.
                // I use RGB for simplicity here, but could use HEX.            
                rowTiles.push({
                    fillStyle: `rgb(${rgb.r},${rgb.g},${rgb.b}`,
                    deltaX, 
                    deltaY
                });                            
            }

            // Render each tile of the current row
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

        // To start at the beginning
        let currentPixel = -this.pixelInterval + 1;

        // This loop moves by the pixelInterval variable
        // The smaller the pixelInterval is the higher the confidende of the average color is
        while ((currentPixel += this.pixelInterval * (this.pixelInterval-1)) < data.length) {              
              rgb.r += data[currentPixel];
              rgb.g += data[currentPixel + 1];
              rgb.b += data[currentPixel + 2];
              totalPixels++;
          }
          
          // To get the average of the analyzed pixels
          // Rounding down so we get an int
          rgb.r = Math.floor(rgb.r / totalPixels);
          rgb.g = Math.floor(rgb.g / totalPixels);
          rgb.b = Math.floor(rgb.b / totalPixels);          

          return rgb;
    }
}

if (exports) {
    exports.MosaicCreator = MosaicCreator;
}