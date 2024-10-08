
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const loader = new GLTFLoader().setPath('3dobj/');
loader.load('scene.glb', (glb) => {
  console.log('loading model');
  const mesh = glb.scene;

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh.position.set(0, 1.05, -1);
  scene.add(mesh);

  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

/*=============== SHOW MENU ===============*/
const navMenu=document.getElementById('nav-menu'),
navToggle=document.getElementById('nav-toggle'),
navClose=document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu')
        })
}

if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu')
        })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink=document.querySelectorAll('.nav__link')

const linkAction=()=>{
    const navMenu=document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n=>n.addEventListener('click',linkAction))

const scrollHeader =()=>{
    const header=document.getElementById('header')
    this.scrollY >=50
}
/*=============== ADD BLUR HEADER ===============*/
const blurHeader=()=>{
    const header=document.getElementById('header')
    this.scrollY >=50 ?header.classList.add('blur-header')
     :header.classList.remove('blur-header')
}
window.addEventListener('scroll',blurHeader)

/*=============== SWIPER PLANETS ===============*/ 
const swiperTravel=new Swiper('.travel__swiper',{
    loop:true,
    spaceBetween:'32',
    grabCursor: true,
    slidesPerView:'auto',
    centeredSlides:'auto',

    pagination:{
        el:'.swiper-pagination',
        clickable:true,
    },

    breakpoints:{
        600:{
            slidesPerView:2,
        },
        900:{
            slidesPerView:3,
        },
    },
})

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp=()=>{
    const scrollUp=document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList
    .remove('show-scroll')
}
window.addEventListener('scroll',scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections=document.querySelectorAll('section[id]')

const scrollActive=()=>{
    const scrollDown = window.scrollY


sections.forEach(current=>{
    const sectionHeight=current.offsetHeight,
    sectionTop=current.offsetTop-58,
    sectionId=current.getAttribute('id')
    sectionsClass=document.querySelector('.nav__menu a[href*='+sectionId+']')

    if(scrollDown>sectionTop&&scrollDown<=sectionTop + sectionHeight){
        sectionsClass.classList.add('active-link')
    }else{
        sectionsClass.classList.remove('active-link')
    }
    })

}
window.addEventListener('scroll',scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr=ScrollReveal({
    origin:'top',
    distance:'80px',
    duration:2500,
    delay:300,

})
sr.reveal(`.home__data, .travel__swiper , .contact__container`)
sr.reveal(`.home__img`,{origin:'bottom'})
sr.reveal(`.home__ovni`,{delay:800})
sr.reveal(`.explore__img`,{origin:'left'})
sr.reveal(`.explore__data`,{origin:'right'})
sr.reveal(`.explore__planet`,{origin:'right',delay:800})
sr.reveal(`.history__card`,{interval:100})
sr.reveal(`.history__planet-1`,{origin:'left',delay:1000})
sr.reveal(`.history__planet-2`,{origin:'right',delay:1200})
sr.reveal(`.footer__planet-1`,{origin:'bottom',delay:600})
sr.reveal(`.footer__planet-2`,{delay:800})


