# Background Slider Images

## Image Requirements

The BackgroundSlider component requires 3 optimized images showcasing Ghana. Place these images in the `public/slider/` directory.

### Recommended Images:

1. **ghana-nature.webp** - Kakum National Park canopy walkway
   - Theme: Nature/Adventure
   - Suggested: Lush rainforest, canopy bridge, golden hour lighting
   
2. **ghana-culture.webp** - Cape Coast Castle
   - Theme: History/Culture
   - Suggested: Historic fortress, sunset, Atlantic Ocean
   
3. **ghana-urban.webp** - Modern Accra skyline
   - Theme: Urban/Modern
   - Suggested: City lights, dusk, contemporary architecture

### Image Specifications:

- **Format**: WebP (for best compression)
- **Dimensions**: 1920x1080 (16:9 aspect ratio)
- **File Size**: < 200KB each (optimized)
- **Quality**: 80-85% (balance between quality and file size)

### Optimization Tools:

- **Squoosh**: https://squoosh.app/
- **TinyPNG**: https://tinypng.com/
- **ImageOptim**: https://imageoptim.com/

### Temporary Placeholders:

Until you add your own images, the slider will use Unsplash placeholder URLs:
- Nature: Tropical rainforest scene
- Culture: Historic architecture
- Urban: City skyline

### How to Replace:

1. Create `public/slider/` directory
2. Add your 3 optimized WebP images
3. Update the `sliderImages` array in `LandingScreen.tsx`:
   ```typescript
   const sliderImages = [
     '/slider/ghana-nature.webp',
     '/slider/ghana-culture.webp',
     '/slider/ghana-urban.webp',
   ];
   ```

### Performance Tips:

- Use WebP format for 25-35% smaller file sizes
- Compress images to < 200KB each
- Use responsive images with `srcset` for mobile
- Enable lazy loading for images 2 and 3
