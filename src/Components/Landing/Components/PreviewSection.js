import React, {useState} from 'react';
import '../Landing.scss';
import {FaDesktop,
    FaMobileAlt,
    FaGooglePlay,
    FaArrowLeft,
    FaArrowRight} from "react-icons/all";
import Desktop1 from "../../../Images/desktop_1.png"
import Desktop2 from "../../../Images/desktop_2.png"
import Phone1 from "../../../Images/phone_1.png";
import Phone2 from "../../../Images/phone_2.png";

/**
 * Fait partie de l'affichage de la page d'accueil.
 * Affiche un diaporama de différentes vues des applis web et mobile de Kwili.
 * @returns {React.Fragment}
 */
function PreviewSection() {


    const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
    const [desktopDemoImages] = [[Desktop1, Desktop2]];
    const [phoneDemoImages] = [[Phone1, Phone2]];

    /**
     * Met à jour le diaporama quand l'utilisateur clique sur l'une ou l'autre des flèches.
     * @param {string} side côté du diaporama cliqué (gauche ou droite)
     */
    const updateDemoImages = (side) => {
        if (side === "right") {
            if (currentDemoIndex < (phoneDemoImages.length - 1)) {
                setCurrentDemoIndex(currentDemoIndex + 1);
            } else {
                setCurrentDemoIndex(0);
            }
        } else if (side === "left") {
            if (currentDemoIndex > 0) {
                setCurrentDemoIndex(currentDemoIndex - 1);
            } else {
                setCurrentDemoIndex(phoneDemoImages.length - 1);
            }
        }
    };

    /**
     * Affichage du diaporama.
     */
    const renderPreviewSection = () => {

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
                                <img src={desktopDemoImages[currentDemoIndex]} alt={"kwili desktop demo"} />
                            </div>
                            <div className={"phoneBg"}>
                                <img src={phoneDemoImages[currentDemoIndex]} alt={"kwili phone demo"} />
                            </div>
                        </div>
                        <div className={"arrowButtonsWrapper"}>
                            <div className={"arrowButton"}
                                 onClick={() => updateDemoImages("left")}><FaArrowLeft/></div>
                            <div className={"arrowButton"}
                                 onClick={() => updateDemoImages("right")}><FaArrowRight/></div>
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
                                <p>Retrouvez Kwili plus facilement en téléchargeant notre appli mobile, qui possède les
                                    mêmes
                                    fonctionnalités.</p>
                            </div>
                        </div>

                        {/*kwili app download button*/}
                        <div className={"buttonsWrapper"}>
                            <a href="https://play.google.com/store/apps/details?id=fr.kwili.kwili" target="_blank" rel="noopener noreferrer">
                              <div className={"downloadButton"}>
                                <div className={"icon"}><FaGooglePlay/></div>
                                <div className={"col"}>Télécharger sur <br/><em>Google Play</em></div>
                              </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    return renderPreviewSection();

}

export default PreviewSection;
