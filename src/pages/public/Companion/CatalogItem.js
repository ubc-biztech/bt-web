import InnoventLogo from  "../../../assets/2023/blueprint/InnoventLogo.png";
import Printer from "../../../assets/2023/blueprint/3dprinter.jpg";
import React from "react";
function CatalogItem (props) {
    return (
        <div className="container" style={{width: props.isMobile ? "60%" : "17%", padding: "6px", margin: "0px 10px 0px 10px"}}>

            <div className="title" style={{width: "100%", height: "200px", backgroundColor: "white", padding: "6px", borderRadius: "8px 8px 0px 0px"}}>
            <div class="overlay">
                <div className="hidden-text" style={{marginBottom: "5px"}}>{props.description}</div>
            </div>
            <img src={props.image} width="100%" style={{maxHeight:"180px"}}></img>
            </div>
            <div style={{ width: "100%", backgroundColor: "white", fontFamily: "Proximanova, Arial, sans-serif", display: "flex", flexDirection: "column", padding: "1%", borderRadius: "0px 0px 8px 8px", borderTopStyle: "solid"}}>
                <div style={{fontWeight: "bold", marginBottom: "5px"}}>{props.item}</div>
                <div style={{fontWeight: "bold"}}>{props.price}</div>
                <div>{props.quantity} total</div>
       
            </div>
            
        </div>


        

    )

}

export default CatalogItem;