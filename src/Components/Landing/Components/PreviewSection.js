import React from 'react';
import '../Landing.scss';
import {FaDesktop,
    FaMobileAlt,
    FaGooglePlay,
    FaApple,
    FaArrowLeft,
    FaArrowRight} from "react-icons/all";
import DesktopImg from "../../../Images/desktop.png";
import PhoneImg from "../../../Images/phone.png";

function previewSection() {

    return (

        <div className="previewSection">
            <div className={"textWrapper"}>
                <h2 className={"sectionTitle"}>Aperçu</h2>
                <p className={"sectionSubtitle"}>Kwili, concrètement, à quoi ça ressemble ?</p>
            </div>

            <div className={"previewContents"}>

                {/*kwili demo slide show*/}
                <div className={"demo"}>
                    <div className={"slideShow"}>
                       <div className={"desktopBg"}>
                            <img src={DesktopImg} alt={"kwili phone demo background"}/>
                        </div>
                        <div className={"phoneBg"}>
                            <img src={PhoneImg} alt={"kwili desktop demo background"}/>
                        </div>
                    </div>
                    <div className={"arrowButtonsWrapper"}>
                        <div className={"arrowButton"}><FaArrowLeft/></div>
                        <div className={"arrowButton"}><FaArrowRight/></div>
                    </div>
                </div>

                {/*kwili demo description */}
                <div className={"text"}>
                    <div className={"previewDescriptionItem"}>
                        <div className={"icon"}>
                            <FaDesktop/>
                        </div>
                        <div className={"col"}>
                            <h3>Un site web</h3>
                            <p>Trouvez les urgences les plus proches de vous et l'itinéraire pour vous y rendre, et
                            bénéficiez d'une première prise en charge grâce à notre chat en ligne, qui pourra
                            également vous réorienter vers un médecin généraliste ou spécialiste. <br/>
                            Le tout sans même avoir besoin de vous connecter !</p>
                        </div>
                    </div>

                    <div className={"previewDescriptionItem"}>
                        <div className={"icon"}>
                            <FaMobileAlt/>
                        </div>
                        <div className={"col"}>
                            <h3>Une application complémentaire</h3>
                            <p>Retrouvez Kwili plus facilement en téléchargeant notre appli mobile, qui possède les mêmes
                            fonctionnalités ainsi que la possibilité de créer un compte.</p>
                        </div>
                    </div>

                    {/*kwili app download button*/}
                    <div className={"buttonsWrapper"}>
                        <div className={"downloadButton"}>
                            <div className={"icon"}><FaGooglePlay/></div>
                            <div className={"col"}>Télécharger sur <br/><em>Google Play</em></div>
                        </div>
                        <div className={"downloadButton"}>
                            <div className={"icon"}><FaApple/></div>
                            <div className={"col"}>Télécharger sur <br/><em>l'App Store</em></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default previewSection;