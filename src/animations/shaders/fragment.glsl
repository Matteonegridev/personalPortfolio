uniform float uTime; // Time passed from JavaScript's render loop
varying vec2 vUv;    // UV coordinates received from Vertex Shader

void main() {
    // 1. Shift UV coordinates from (0.0 to 1.0) to (-1.0 to 1.0) to find the center
    vec2 centeredUv = vUv * 2.0 - 1.0;
    
    // 2. Draw the Circle
    // We calculate the distance from the center (0,0) using the Pythagorean theorem
    float dist = length(centeredUv); 
    
    // smoothstep(min, max, value) returns 0.0 if dist is outside the radius (0.8),
    // and 1.0 if inside, with a 0.01 blur for anti-aliasing the edges.
    float circleAlpha = 1.0 - smoothstep(0.79, 0.80, dist);

    // 3. Create the Gradient
    // vec3 represents RGB colors. 
    vec3 colorTop = vec3(1.0, 0.7, 0.0);    // Cyber Yellow
    vec3 colorBottom = vec3(1.0, 0.0, 0.5); // Neon Magenta
    
    // mix(color1, color2, ratio) blends the two colors based on the Y coordinate
    vec3 gradient = mix(colorBottom, colorTop, vUv.y);

    // 4. Carve the Synthwave Scanlines
    // We use a sine wave multiplied by frequency (30.0) and offset by time.
    // step(edge, x) acts as a hard mathematical threshold, returning 0.0 or 1.0.
    float stripes = step(0.4, sin(vUv.y * 30.0 - uTime * 2.0));
    
    // We only want stripes on the bottom half. 
    // We mix the stripes with solid 1.0 based on the Y height.
    float stripeMask = mix(stripes, 1.0, vUv.y);

    // 5. Final Output Compositing
    vec3 finalColor = gradient * stripeMask;
    
    // We only render pixels that are part of the circle and part of the mask
    float finalAlpha = circleAlpha * stripeMask;

    gl_FragColor = vec4(finalColor, finalAlpha);
}