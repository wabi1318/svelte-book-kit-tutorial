<script>
    const { images } = $props();
  
    let centerIndex = $state(0);
    let leftIndex = $state(images.length - 1);
    let rightIndex = $state(1);
  
    function sliderMoveLeft() {
      centerIndex = (centerIndex - 1 + images.length) % images.length;
    }
  
    function sliderMoveRight() {
      centerIndex = (centerIndex + 1) % images.length;
    }
  </script>
  
  <style>
    .slider {
      position: relative;
      width: 80%;
      margin: 0 10%;
    }
  
    .slider-item {
      width: 100%;
    }
  
    .slider-item.left {
      position: absolute;
      top: 0;
      right: 100%;
    }
  
    .slider-item.right {
      position: absolute;
      top: 0;
      left: 100%;
    }
  
    .slider-left-button {
      position: absolute;
      top: 50%;
      left: -30px;
      transform: translateY(-50%);
      cursor: pointer;
      z-index: 10;
    }
  
    .slider-right-button {
      position: absolute;
      top: 50%;
      right: -30px;
      transform: translateY(-50%);
      cursor: pointer;
      z-index: 10;
    }
  </style>
  
  <div class="slider">
    <img src={images[leftIndex]} alt="左側のスライダー画像" class="slider-item left" />
    <img src={images[centerIndex]} alt="中央のスライダー画像" class="slider-item center" />
    <img src={images[rightIndex]} alt="右側のスライダー画像" class="slider-item right" />
    <button onclick={sliderMoveLeft} class="slider-left-button">←</button>
    <button onclick={sliderMoveRight} class="slider-right-button">→</button>
  </div>