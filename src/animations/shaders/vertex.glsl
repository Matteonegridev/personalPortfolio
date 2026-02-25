// 'uv' is automatically provided by Three.js. It represents the 2D X/Y 
// coordinates of the plane from 0.0 to 1.0.
varying vec2 vUv; 

void main() {
    // Pass the UV coordinates down to the Fragment Shader
    vUv = uv;

    // modelViewMatrix and projectionMatrix are provided by Three.js.
    // They calculate where this vertex sits relative to the camera.
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}