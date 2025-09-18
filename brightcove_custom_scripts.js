// Function to get meta content
function getMetaContent(metaId) {
    const metaTag = document.querySelector(`meta#${metaId}`);
    return metaTag ? decodeURIComponent(metaTag.getAttribute('content')) : '';
}

// Initialize variables
let programDivMetadata = '';
let previousMetadata = ''; // To store the previous metadata
let metadataUpdated = false; // Flag to avoid redundant updates

let trailerURL = '';
let previousTrailerURL = '';
let trailerUpdated = false;

let amazonLink = '';
let previousAmazonLink = '';
let amazonLinkUpdated = false;

let appleLink = '';
let previousAppleLink = '';
let appleLinkUpdated = false;

// Function to fetch and set metadata
function setMetadata() {
    const actorsContent = getMetaContent('custom-video-field-actors');
    const directorsContent = getMetaContent('custom-video-field-directors');
    const yearContent = getMetaContent('custom-video-field-year');
    const trailerID = getMetaContent('custom-video-field-trailer_youtube_id');
    
    amazonLink = getMetaContent('custom-video-field-amazon_prime_video_link');
    appleLink = getMetaContent('custom-video-field-apple_tv_link');

    let newMetadata = '';
    let newTrailerURL = '';
    let newAmazonLink = '';
    let newAppleLink = '';

    if (actorsContent) {
        newMetadata += `Featured Artists: ${actorsContent}`;
    }
    if (directorsContent) {
        newMetadata += newMetadata ? `, ${directorsContent}` : directorsContent;
    }
    if (yearContent) {
        newMetadata += newMetadata ? ` <br />Performance Year: ${yearContent}` : `Performance Year: ${yearContent}`;
    }

    if (trailerID) {
        newTrailerURL = `https://www.youtube.com/embed/${trailerID}`;
    }

    if (amazonLink) {
        newAmazonLink = amazonLink;
    }
    if (appleLink) {
        newAppleLink = appleLink;
    }

    programDivMetadata = newMetadata;
    trailerURL = newTrailerURL;

    // Update only if metadata changes
    if (programDivMetadata !== previousMetadata) {
        previousMetadata = programDivMetadata;
        metadataUpdated = true; // Set the flag to true when metadata is updated
        console.log('Here is the program metadata: ' + programDivMetadata);
    } else {
        metadataUpdated = false; // Reset the flag if metadata hasn't changed
    }
    
    // My code
    if (trailerURL !== previousTrailerURL) {
        previousTrailerURL = trailerURL;
        trailerUpdated = true;
        console.log('Here is the trailer URL: ' + trailerURL);
    } else {
        trailerUpdated = false;
    }

    if (amazonLink !== previousAmazonLink) {
        previousAmazonLink = amazonLink;
        amazonLinkUpdated = true;
        console.log(`Amazon Link : ${amazonLink}`);
    } else {
        amazonLinkUpdated = false;
    }
    if (appleLink !== previousAppleLink) {
        previousAppleLink = appleLink;
        appleLinkUpdated = true;
        console.log(`Apple Link : ${appleLink}`);
    } else {
        appleLinkUpdated = false;
    }
}

// Function to add or update metadata on the page
function updateMetadataOnPage() {
    const existingElement = document.getElementsByClassName('SingleVideoDetails__description')[0];
    const parentDiv = document.getElementsByClassName('SingleVideoDetails')[0];

    if (existingElement && metadataUpdated) {
        let metadataElement = document.getElementById('program-metadata');
        
        // Remove old metadata element if exists
        if (metadataElement) {
            metadataElement.remove();
            metadataElement = null;
        }

        // Create a new paragraph element and add metadata
        // Commenting out the code that adds in additional metadata, since that is now being manually added into the long description field.

        /*
        if (!metadataElement) {
            metadataElement = document.createElement("p");
            metadataElement.id = 'program-metadata'; // Add an ID to the paragraph
            existingElement.after(metadataElement);
        } 

        metadataElement.innerHTML = programDivMetadata;
        console.log("Metadata and trailer updated on the page"); */
        
        // Reset flag after updating
        metadataUpdated = false;
    }

    if (existingElement && amazonLinkUpdated && appleLinkUpdated) {
        let buttonElement = document.getElementById('amazon-and-apple-links');

        if (buttonElement) {
            buttonElement.remove();
            buttonElement = null;
        }

        if(!buttonElement) {
            let buttonDiv = document.createElement('div');
            let amazonButton = document.createElement('a');
            let appleButton = document.createElement('a');

            buttonDiv.id = 'amazon-and-apple-links';
            buttonDiv.style = 'height: 50px; width: 100%; display: flex;';

            amazonButton.href = amazonLink;
            amazonButton.target = "_blank";
            amazonButton.innerHTML = "Available on Prime Video";
            amazonButton.style = 'flex-basis: 50%; text-align: center; margin-left: 5px; padding: 0; color: black; border: 1px outset buttonborder; border-radius: 5px; background-color: buttonface; text-decoration: none; display: flex; align-items: center; justify-content: center; height: 100%;';

            appleButton.href = appleLink;
            appleButton.target = "_blank";
            appleButton.innerHTML = "Watch on the Apple TV app";
            appleButton.style = 'flex-basis: 50%; text-align: center; margin-right: 5px; padding: 0; color: black; border: 1px outset buttonborder; border-radius: 5px; background-color: buttonface; text-decoration: none; display: flex; align-items: center; justify-content: center; height: 100%;';
        
            buttonDiv.appendChild(appleButton);
            buttonDiv.appendChild(amazonButton);

            parentDiv.appendChild(buttonDiv);
            
            // create the additional line of text below the buttons
            let infoDiv = document.createElement('div');
            infoDiv.id = 'full-distro-info';
            infoDiv.innerText = "Carnegie Hall+ is available on the Apple TV app, Prime Video Channels, Spectrum, Xfinity, Xumo, Verizon Fios, Cox, DISH, Sling TV, and with a Carnegie Hall Membership at the Supporter level and above.";
            infoDiv.style = 'width: 100%; text-align: left; margin-top: 8px;';

            // append that text line right after the buttons
            parentDiv.appendChild(infoDiv);

            
        }
    }

    if (existingElement && trailerUpdated) {
        let iframeElement = document.getElementById('youtube-trailer');

        if (iframeElement) {
            iframeElement.remove();
            iframeElement = null;
        }

        if (!iframeElement) {
            let iframeDiv = document.createElement('div');
            let iframeHeader = document.createElement('h3');

            iframeHeader.id = 'iframe-header';
            iframeHeader.style = 'font-size:1em; font-weight:bold;'
            iframeHeader.innerHTML = 'Watch the Trailer';

            iframeDiv.style="width: 100%; padding-bottom: 80px;";

            iframeElement = document.createElement("iframe");
            iframeElement.id = 'youtube-trailer';
            iframeElement.style = "aspect-ratio: 16 / 9; width: 100%;";
            iframeElement.src = trailerURL;
            iframeElement.frameborder = '0';
            iframeElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframeElement.referrerpolicy = "strict-origin-when-cross-origin";
            iframeElement.allowfullsceen = "";

            iframeDiv.appendChild(iframeHeader);
            iframeDiv.appendChild(iframeElement);

            parentDiv.appendChild(iframeDiv);

            console.log('Trailers Added');
        }

        trailerUpdated = false;
    }
}

// Function to handle DOM content readiness and updates
function handleContentReadiness() {
    const metaTagsReady = getMetaContent('custom-video-field-actors') || getMetaContent('custom-video-field-directors') || getMetaContent('custom-video-field-year') || getMetaContent('custom-video-field-trailer_youtube_id');
    const targetElementReady = document.getElementsByClassName('SingleVideoDetails__description')[0];

    if (metaTagsReady && targetElementReady) {
        setMetadata(); // Set metadata
        updateMetadataOnPage(); // Add or update metadata on the page
        observeDOMChanges(); // Start observing for dynamic content
    } else {
        // Retry every 500ms until meta tags and target element are ready
        setTimeout(handleContentReadiness, 500);
    }
}

// Function to monitor DOM changes
function observeDOMChanges() {
    const observer = new MutationObserver((mutationsList) => {
        let hasUpdates = false;
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                hasUpdates = true;
                break;
            }
        }
        if (hasUpdates) {
            setMetadata(); // Ensure metadata is set
            updateMetadataOnPage(); // Update the page with the new metadata
        }
    });

    // Start observing the body or a specific container where the element is expected to appear
    observer.observe(document.body, { childList: true, subtree: true });
}

setTimeout(handleContentReadiness, 1000);
