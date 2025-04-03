// import "../styles/Home2.css";
import img1 from "../assets/chair.webp";
import img2 from "../assets/chair.webp";
import img3 from "../assets/chair.webp";
import img4 from "../assets/chair.webp";
import img5 from "../assets/chair.webp";
import img6 from "../assets/chair.webp";
import { useNavigate } from "react-router-dom";
import "../styles/homepage.css";


export const ProductList = [
    {
        id:1,
        image:img1,
        CardTitle:'Body Lotion',
        price:'23$-25$',
        Description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim auctor quam nec dapibus. Etiam pulvinar lectus lorem, vel condimentum felis tincidunt eget. Curabitur sem nisl, porta rutrum molestie quis, blandit vitae nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
    },
    {
        id:2,
        image:img2,
        CardTitle:'Sports',
        price:'18$',
        Description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim auctor quam nec dapibus. Etiam pulvinar lectus lorem, vel condimentum felis tincidunt eget. Curabitur sem nisl, porta rutrum molestie quis, blandit vitae nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
    
    },
    {
        id:3,
        image:img3,
        CardTitle:'Computer Gadget',
        price:'20$-30$',
        Description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim auctor quam nec dapibus. Etiam pulvinar lectus lorem, vel condimentum felis tincidunt eget. Curabitur sem nisl, porta rutrum molestie quis, blandit vitae nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
    },
    {
        id:4,
        image:img4,
        CardTitle:'Electronics',
        price:'30$',
        Description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim auctor quam nec dapibus. Etiam pulvinar lectus lorem, vel condimentum felis tincidunt eget. Curabitur sem nisl, porta rutrum molestie quis, blandit vitae nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
    },
    {
        id:5,
        image:img5,
        CardTitle:'Watch',
        price:'6$',
        Description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim auctor quam nec dapibus. Etiam pulvinar lectus lorem, vel condimentum felis tincidunt eget. Curabitur sem nisl, porta rutrum molestie quis, blandit vitae nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
    },
    {
        id:6,
        image:img6,
        CardTitle:'Woman Clothes',
        price:'15$-30$',
        Description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim auctor quam nec dapibus. Etiam pulvinar lectus lorem, vel condimentum felis tincidunt eget. Curabitur sem nisl, porta rutrum molestie quis, blandit vitae nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
    }

];

 function HomePage(){
    const navigation = useNavigate();

    const handleNavigate = (id) =>{
        navigation(`/singlecard/${id}`)
    }

    return (
        <div className="navcontainer">
          
         
              {ProductList.map((item)=>{
                <div className="cont" key={item.id}>
                  <div><img src={item.image}/></div>
                  <div><img src={item.CardTitle}/></div>
                  <button type="button" className="button11" onClick={() =>handleNavigate(item.id)} >View</button>

                </div>
            })}
        </div>
    )
}

export default HomePage