import InnoventLogo from  "../../../assets/2023/blueprint/InnoventLogo.png";
import Printer from "../../../assets/2023/blueprint/3dprinter.jpg";
import React from "react";
function CatalogItem (props) {
    return (
        <div style={{padding: "6px"}}>
            <div style={{width: "30%", height: "200px", backgroundColor: "white", padding: "6px", borderRadius: "8px 8px 0px 0px"}}>
            <img src={Printer} width="100%" style={{maxHeight:"180px"}}></img>
            </div>
            <div style={{ width: "30%", backgroundColor: "white", display: "flex", flexDirection: "column", padding: "1%", borderRadius: "0px 0px 8px 8px", borderTopStyle: "solid"}}>
                <div>This is the product name</div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia.</div>
            <div style={{textAlign: "right"}}>
                <h3>$20</h3>
            </div>        
            </div>
           
        </div>

    )

}

export default CatalogItem;