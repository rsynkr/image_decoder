let filters = {
    Brightness: {
        value: 100, 
        min: 0, 
        max: 200, 
        unit: '%'
    },
    Contrast:{
        value: 100, 
        min: 0, 
        max: 200, 
        unit: '%'
    },
    
    Saturation:{
        value: 100, 
        min: 0, 
        max: 200, 
        unit: '%'
    },
    HueRotation:{
        value: 0, 
        min: 0, 
        max: 360, 
        unit: 'deg'

    },
    Blur:{
        value: 0, 
        min: 0, 
        max: 20, 
        unit: 'px'
    },
    Grayscale:{
        value: 0, 
        min: 0, 
        max: 100, 
        unit: '%'
    },
    Sepia:{
        value: 0,   
        min: 0, 
        max: 100, 
        unit: '%'
    },
    Opacity:{
        value: 100, 
        min: 0, 
        max: 100, 
        unit: '%'
    },
    Invert:{
        value: 0, 
        min: 0, 
        max: 100, 
        unit: '%'
    }
}
let file=null
let image=null

const filtersConatainer=document.querySelector(".filters");
function createFilterElement(name, min, max, value, unit=''){
    const div=document.createElement("div");
    div.classList.add("filter");
    const input=document.createElement("input");
    input.type="range";
    input.min=min;
    input.max=max;
    input.value=value;
    input.id=name;
    const p=document.createElement("p");
    p.textContent=name;
    div.appendChild(p);
    div.appendChild(input);


    input.addEventListener("input",(event)=>{
        filters[name].value=input.value;
        applyFilters();
    })
    return div;
}

function createFilters(){

    
    Object.keys(filters).forEach(key=>{
        const filterElement=createFilterElement(key, filters[key].min, filters[key].max, filters[key].value, filters[key].unit);
        filtersConatainer.appendChild(filterElement)
    })
}
createFilters()
const imgagecanvas=document.querySelector("#image-canvas");
const ctx = imgagecanvas.getContext("2d"); 
const image_input=document.querySelector("#image-input");
const resetbtn=document.querySelector("#reset-btn");
image_input.addEventListener("change",(event)=>{
    
    
    const imagePlaceholder=document.querySelector(".placeholder");
    imagePlaceholder.style.display="none";
    
    const file=event.target.files[0]
    const img=new Image()
    img.src=URL.createObjectURL(file)
    imgagecanvas.style.display="block";
    img.onload = () => {
    image = img;
    imgagecanvas.width = img.width;
    imgagecanvas.height = img.height;
    applyFilters();
};

    
    
})

function applyFilters() {
    if (!image) return;

    ctx.clearRect(0, 0, imgagecanvas.width, imgagecanvas.height);

    ctx.filter = `brightness(${filters.Brightness.value}${filters.Brightness.unit})
                contrast(${filters.Contrast.value}${filters.Contrast.unit})
                
                saturate(${filters.Saturation.value}${filters.Saturation.unit})
                hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
                blur(${filters.Blur.value}${filters.Blur.unit})
                grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
                sepia(${filters.Sepia.value}${filters.Sepia.unit})
                opacity(${filters.Opacity.value}${filters.Opacity.unit})
                invert(${filters.Invert.value}${filters.Invert.unit})
                `

    ctx.drawImage(image, 0, 0);
}

resetbtn.addEventListener("click",()=>{
    filters = {
    Brightness: {
        value: 100, 
        min: 0, 
        max: 200, 
        unit: '%'
    },
    Contrast:{
        value: 100, 
        min: 0, 
        max: 200, 
        unit: '%'
    },
    
    Saturation:{
        value: 100, 
        min: 0, 
        max: 200, 
        unit: '%'
    },
    HueRotation:{
        value: 0, 
        min: 0, 
        max: 360, 
        unit: 'deg'

    },
    Blur:{
        value: 0, 
        min: 0, 
        max: 20, 
        unit: 'px'
    },
    Grayscale:{
        value: 0, 
        min: 0, 
        max: 100, 
        unit: '%'
    },
    Sepia:{
        value: 0,   
        min: 0, 
        max: 100, 
        unit: '%'
    },
    Opacity:{
        value: 100, 
        min: 0, 
        max: 100, 
        unit: '%'
    },
    Invert:{
        value: 0, 
        min: 0, 
        max: 100, 
        unit: '%'
    }
    }
    applyFilters()
    filtersConatainer.innerHTML=""
    createFilters()
} )
const downloadbtn=document.querySelector("#download-btn");
downloadbtn.addEventListener("click",()=>{
    const link=document.createElement("a");
    link.download="edited-image.png";
    link.href=imgagecanvas.toDataURL();
    link.click();
})