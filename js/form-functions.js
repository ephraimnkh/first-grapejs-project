// form select elements 
var enquiryServiceSelect = document.getElementById('enquiry-service');
var typesOfServicesSelect = document.getElementById('types-of-services-select');
var servicesSelect = document.getElementById('services-select');
var packagesSelect = document.getElementById('packages-select');
var subjectField = document.getElementById('contactSubject');
var messageField = document.getElementById('contactMessage');

// select forms text or labels
var typesOfServicesSelectText = document.getElementById('types-of-services-select-text');
var servicesSelectText = document.getElementById('services-select-text');
var packagesSelectText = document.getElementById('packages-select-text');

// Build up arrays with service types, services and their packages
var typesOfServices = [
    { id: 0, name: "Website", serviceText: "What type of website service are you looking for?" },
    { id: 1, name: "SEO", serviceText: "What type of SEO service are you looking for?" },
    { id: 2, name: "Digital Marketing", serviceText: "What type of digital marketing service are you looking for?" },
    { id: 3, name: "Other Digital Services", serviceText: "What type of other service are you looking for?" }
]
var services = [
    { id: 0, tosID: 0, name: "Free Website Health Check", hasPackages: false, packageText: "", subjectText: "I would like a FREE Report on my Website's Health", messageText: "This is my url [replace this with your url]", messageRequired: true, messageWarning: "We are going to need your url" },
    { id: 1, tosID: 0, name: "Business Website", hasPackages: true, packageText: "Which Business Website package do you want?", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 2, tosID: 0, name: "Personal Website", hasPackages: true, packageText: "Which Personal Website package do you want?", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    // { id: 3, tosID: 0, name: "Changes to your existing website", hasPackages: false, packageText: "", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    // { id: 4, tosID: 0, name: "Website Maintenance", hasPackages: true, packageText: "Which website maintenance package do you want?", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 5, tosID: 1, name: "Free Website SEO Check", hasPackages: false, packageText: "", subjectText: "I would like a FREE Report on my Website's SEO", messageText: "This is my url [replace this with your url]", messageRequired: true, messageWarning: "We are going to need your url" },
    { id: 6, tosID: 2, name: "Business Branding Help", hasPackages: true, packageText: "Which Business Branding package do you want?", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 7, tosID: 3, name: "Business Email Set Up", hasPackages: false, packageText: "", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 8, tosID: 3, name: "MailChimp Set Up", hasPackages: false, packageText: "", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 9, tosID: 3, name: "SSL Certificate Set Up", hasPackages: false, packageText: "", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 10, tosID: 3, name: "Google My Business Set Up", hasPackages: false, packageText: "", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 11, tosID: 2, name: "Social Media Account Management", hasPackages: true, packageText: "Which Social Media Account Management package do you want?", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 12, tosID: 2, name: "Market Research", hasPackages: true, packageText: "Which Market Research package do you want?", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 13, tosID: 2, name: "Copywriting", hasPackages: true, packageText: "Which Copywriting package do you want?", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 14, tosID: 3, name: "Google Analytics Set Up", hasPackages: false, packageText: "", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 15, tosID: 3, name: "Facebook Pixel Set Up", hasPackages: false, packageText: "", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 16, tosID: 2, name: "Advertising", hasPackages: true, packageText: "Which Advertising package do you want?", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" }
]
var packages = [
    { id: 0, serviceID: 1, name: "Online Foundation" },
    { id: 1, serviceID: 1, name: "Service Provider" },
    { id: 2, serviceID: 1, name: "Service Provider Plus" },
    { id: 3, serviceID: 2, name: "Personal Starter Site" },
    { id: 4, serviceID: 2, name: "Personal Brand", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 5, serviceID: 2, name: "Personal Brand Plus", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    // { id: 6, serviceID: 4, name: "Monthly Website Maintenance", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    // { id: 7, serviceID: 4, name: "Monthly Website Maintenance Plus", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    // { id: 8, serviceID: 4, name: "Monthly Website Maintenance Pro", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    // { id: 9, serviceID: 4, name: "Basic Website Maintenance", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    // { id: 10, serviceID: 4, name: "Website Health Booster", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    // { id: 11, serviceID: 4, name: "Full House Website Maintenance", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 12, serviceID: 6, name: "Brand Identifier", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 13, serviceID: 6, name: "Brand Guidance", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 14, serviceID: 6, name: "Brand Construction", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 15, serviceID: 11, name: "Direct Translation", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 16, serviceID: 11, name: "Social Media Translator", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 17, serviceID: 11, name: "Social Media Influencer", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 18, serviceID: 12, name: "FREE Guide For Market Research", subjectText: "I would like a FREE Guide on how to do Market Research", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 19, serviceID: 12, name: "Beginner Research", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 20, serviceID: 12, name: "Market Researcher", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 21, serviceID: 12, name: "Market Researching Expert", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 22, serviceID: 13, name: "Copywriting Novice", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 23, serviceID: 13, name: "Transitional Copywriter", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 24, serviceID: 13, name: "Copywriting Expert", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 25, serviceID: 16, name: "Digital Advertiser", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 26, serviceID: 16, name: "Digital Marketer", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" },
    { id: 27, serviceID: 16, name: "Digital Marketing Expert", subjectText: "", messageText: "", messageRequired: false, messageWarning: "" }
]

// called when a selection is made on the enquiry service select field
function enquiryServiceSelection() {
    // clear subject and message on selection change
    resetSubjectMessage();
    if (enquiryServiceSelect.value == "select" || enquiryServiceSelect.value == "enquiry") {
        resetBelowEnquiryService();
    }
    if (enquiryServiceSelect.value == 'service') {
        // show the types of services select and its label
        typesOfServicesSelect.hidden = false;
        typesOfServicesSelectText.hidden = false;
        // if the types of services select contains only one option being "select" then populate it as it's empty
        if (typesOfServicesSelect.length == 1){
            // Populate the type of services select
            for (let i = 0; i < typesOfServices.length; i++) {
                let option = document.createElement("option");
                option.text = typesOfServices[i].name;
                option.value = typesOfServices[i].name;
                option.id = 'tosID' + typesOfServices[i].id
                typesOfServicesSelect.add(option);
            }
        }
    }
}

// called when a selection is made on the types of services select field
function typeOfServiceSelection() {
    // clear subject and message on selection change
    resetSubjectMessage();
    if (typesOfServicesSelect.value == 'select') {
        resetBelowTOS();
    } else {
        // show the services select and its label
        servicesSelect.hidden = false;
        servicesSelectText.hidden = false;
        // sets the services select label values
        for (let i = 0; i < typesOfServices.length; i++){
            if (typesOfServices[i].name == typesOfServicesSelect.value){
                servicesSelectText.innerHTML = typesOfServices[i].serviceText;
                servicesSelectText.title = typesOfServices[i].serviceText;
            }
        }
        // remove services in the services select
        cleanUpServices();
        let selectedOption = typesOfServicesSelect.options[typesOfServicesSelect.selectedIndex];
        // if the services select contains only one option being "select" then populate it as it's empty
        if (servicesSelect.length == 1) {
            // Populate the services select
            for (let i = 0; i < services.length; i++) {
                if (services[i].tosID == selectedOption.id.replace('tosID', '')) {
                    let option = document.createElement('option');
                    option.text = services[i].name;
                    option.value = services[i].name;
                    option.id = services[i].id;
                    servicesSelect.add(option);
                }
            }
        }
    }
}

// called when a selection is made on the services select field
function serviceSelection() {
    // clear subject and message on selection change
    resetSubjectMessage();
    if (servicesSelect.value == 'select'){
        resetBelowServices();
    } else {
        // sets the packages select label values
        // checks if the selected service has packages and sets the showPackagesSelect flag
        // show the services select and its label
        let showPackagesSelect = false;
        for (let i = 0; i < services.length; i++) {
            if (services[i].name == servicesSelect.value) {
                packagesSelectText.innerHTML = services[i].packageText;
                packagesSelectText.title = services[i].packageText;
                showPackagesSelect = services[i].hasPackages;
                // set subject/message if there is one
                if ((services[i].subjectText.length > 0) || (services[i].messageText.length > 0)) {
                    subjectField.value = services[i].subjectText;
                    messageField.value = services[i].messageText;
                }
            }
        }
        // if the selected service has packages then show the package select and its label, if not don't
        if (showPackagesSelect){
            packagesSelect.hidden = false;
            packagesSelectText.hidden = false;
        } else {
            packagesSelect.hidden = true;
            packagesSelectText.hidden = true;
        }
        // remove packages in the packages select
        cleanUpPackages();
        let selectedOption = servicesSelect.options[servicesSelect.selectedIndex];
        // if the packages select contains only one option being "select" then populate it as it's empty
        if (packagesSelect.length == 1) {
            // Populate the packages select
            for (let i = 0; i < packages.length; i++) {
                if (packages[i].serviceID == selectedOption.id.replace('serviceID', '')) {
                    let option = document.createElement('option');
                    option.text = packages[i].name;
                    option.value = packages[i].name;
                    option.id = packages[i].id;
                    packagesSelect.add(option);
                }
            }
        }
    }
}

// called when a selection is made on the packages select field
function packageSelection() {
    // clear subject and message on selection change
    resetSubjectMessage();
    for (let i = 0; i < packages.length; i++) {
        if (packages[i].name == packagesSelect.value) {
            // set subject/message if there is one
            if ((packages[i].subjectText.length > 0) || (packages[i].messageText.length > 0)) {
                subjectField.value = packages[i].subjectText;
                messageField.value = packages[i].messageText;
            }
        }
    }
}


// clears up services in the services select
function cleanUpServices() {
    let servicesLength = servicesSelect.length - 1;
    for (let i = 0; i < servicesLength; i++) {
        servicesSelect.remove(1);
    }
}

// clears up packages in the packages select
function cleanUpPackages() {
    let packagesLength = packagesSelect.length - 1;
    for (let i = 0; i < packagesLength; i++) {
        packagesSelect.remove(1);
    }
}

// Resets everything below the enquiry/service select
function resetBelowEnquiryService() {
    // hide below
    typesOfServicesSelect.hidden = true;
    typesOfServicesSelectText.hidden = true;
    // clear types of services select
    let typesOfServicesLength = typesOfServicesSelect.length - 1;
    for (let i = 0; i < typesOfServicesLength; i++) {
        typesOfServicesSelect.remove(1);
    }
    resetBelowTOS();
}

// Resets everything below the type of services select
function resetBelowTOS() {
    // hide below
    servicesSelect.hidden = true;
    servicesSelectText.hidden = true;
    // clear services select
    let servicesLength = servicesSelect.length - 1;
    for (let i = 0; i < servicesLength; i++){
        servicesSelect.remove(1);
    }
    resetBelowServices();
}

// Resets everything below the services select
function resetBelowServices() {
    // hide below
    packagesSelect.hidden = true;
    packagesSelectText.hidden = true;
    // clear packages select
    let packagesLength = packagesSelect.length - 1;
    for (let i = 0; i < packagesLength; i++) {
        packagesSelect.remove(1);
    }
}

function submitForm() {
    // clear all labels
    resetFormLabels();
    // validity flags
    let validForm = false;
    let validFormSelection = false;
    let validTOSSelection = false;
    let validServiceSelection = false;
    let validPackageSelection = false;
    let validFirstName = false;
    let validLastName = false;
    let validSubject = false;
    let validEmail = false;
    let validMessage = false;
    // flag to say if message should be counted at submit
    let checkMessageAtSubmit = false;

    // Form inputs
    let formSelector = document.getElementById('enquiry-service');
    let tosSelector = document.getElementById('types-of-services-select');
    let serviceSelector = document.getElementById('services-select');
    let packagesSelector = document.getElementById('packages-select');
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let email = document.getElementById('contactEmail');
    let contactSubject = document.getElementById('contactSubject');
    let contactMessage = document.getElementById('contactMessage');
    let formSelectorLabel = document.getElementById('enquiry-service-label');
    let tosSelectorLabel = document.getElementById('types-of-services-select-label');
    let serviceSelectorLabel = document.getElementById('services-select-label');
    let packagesSelectorLabel = document.getElementById('packages-select-label');
    let firstNameLabel = document.getElementById('firstNameLabel');
    let lastNameLabel = document.getElementById('lastNameLabel');
    let contactSubjectLabel = document.getElementById('contactSubjectLabel');
    let emailLabel = document.getElementById('contactEmailLabel');
    let emailValidLabel = document.getElementById('contactValidEmailLabel');
    let contactMessageLabel = document.getElementById('contactMessageLabel');
    let recaptchaLabel = document.getElementById('recaptchaLabel');
    

    // check if enquiry or service is selected
    if (formSelector.value == 'select') {
        formSelectorLabel.hidden = false;
    } else {
        validFormSelection = true;
    }

    // check if type of service is selected
    if (tosSelector.value == 'select' && tosSelector.hidden == false) {
        tosSelectorLabel.hidden = false;
    } else {
        validTOSSelection = true;
    }

    // check if service is selected
    if (serviceSelector.value == 'select' && serviceSelector.hidden == false) {
        serviceSelectorLabel.hidden = false;
    } else {
        validServiceSelection = true;
    }

    // check if package is selected
    if (packagesSelector.value == 'select' && packagesSelector.hidden == false) {
        packagesSelectorLabel.hidden = false;
    } else {
        validPackageSelection = true;
    }

    // check first name for length and validity
    if (firstName.value.length == 0) {
        firstNameLabel.hidden = false;
    }
    if (/[a-zA-Z]/.test(firstName.value)) {
        validFirstName = true;
    }

    // check last name for length and validity
    if (lastName.value.length == 0) {
        lastNameLabel.hidden = false;
    }
    if (/[a-zA-Z]/.test(lastName.value)) {
        validLastName = true;
    }

    // check email for length and validity
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)) {
        validEmail = true;
    } else if (email.value.length > 0) {
        // alert("Please enter a valid email address");
        validEmail = false;
        emailValidLabel.hidden = false;
        // scrolls the contact form email field into view so user can refill the form
        // email.scrollIntoView({ behavior: "smooth" });
    } else {
        emailLabel.hidden = false;
    }

    // check subject for length and validity
    if (contactSubject.value.length == 0) {
        contactSubjectLabel.hidden = false;
    }
    if (/[a-zA-Z]/.test(contactSubject.value)) {
        validSubject = true;
    }

    // checks if message is needed
    for (let i = 0; i < services.length; i++){
        if (services[i].name == serviceSelector.value){
            if (services[i].messageRequired){
                checkMessageAtSubmit = true;
                if (contactMessage.value.length == 0){
                    contactMessageLabel.innerHTML = services[i].messageWarning;
                    contactMessageLabel.title = services[i].messageWarning;
                    contactMessageLabel.hidden = false;
                } else {
                    validMessage = true;
                }
            }
        }
    }

    //recaptcha check
    var isCaptchaValidated = false;
    var response = grecaptcha.getResponse();
    if (response.length == 0) {
        isCaptchaValidated = false;
        // alert('Please verify that you are a Human.');
        recaptchaLabel.hidden = false;
    } else {
        isCaptchaValidated = true;
    }


    if (firstName.value.length > 0 && lastName.value.length > 0 && email.value.length > 0 && contactSubject.value.length > 0 
        && validFormSelection && validTOSSelection && validServiceSelection &&validPackageSelection && validFirstName 
        && validLastName && validSubject && validEmail) {
            // check if message must be checked if so then check it otherwise since all checks completed submit the form
            if (checkMessageAtSubmit){
                if (validMessage){
                    validForm = true;
                }
            } else {
                validForm = true;
            }
    } else {
        // scrolls the contact form into view so user can refill the form
        var contactForm = document.getElementById('contact');
        contactForm.scrollIntoView({ behavior: "smooth" });
    }

    // submit form if recaptcha is valid and form
    if (isCaptchaValidated && validForm) {
        //you can now submit your form
        var myForm = document.getElementById('contact-form');
        myForm.submit();
    }
    // test on local server for submit
    // if (validForm) {
    //     //you can now submit your form
    //     var myForm = document.getElementById('contact-form');
    //     myForm.submit();
    // }
}

function resetFormLabels() {
    let formSelectorLabel = document.getElementById('enquiry-service-label');
    let tosSelectorLabel = document.getElementById('types-of-services-select-label');
    let serviceSelectorLabel = document.getElementById('services-select-label');
    let packagesSelectorLabel = document.getElementById('packages-select-label');
    let firstNameLabel = document.getElementById('firstNameLabel');
    let lastNameLabel = document.getElementById('lastNameLabel');
    let contactSubjectLabel = document.getElementById('contactSubjectLabel');
    let emailLabel = document.getElementById('contactEmailLabel');
    let emailValidLabel = document.getElementById('contactValidEmailLabel');
    let contactMessageLabel = document.getElementById('contactMessageLabel');
    let recaptchaLabel = document.getElementById('recaptchaLabel');
    formSelectorLabel.hidden = true;
    tosSelectorLabel.hidden = true;
    serviceSelectorLabel.hidden = true;
    packagesSelectorLabel.hidden = true;
    firstNameLabel.hidden = true;
    lastNameLabel.hidden = true;
    contactSubjectLabel.hidden = true;
    emailLabel.hidden = true;
    emailValidLabel.hidden = true;
    contactMessageLabel.hidden = true;
    recaptchaLabel.hidden = true;
}

// clear the values in the subject and message fields
function resetSubjectMessage() {
    var subjectField = document.getElementById('contactSubject');
    var message = document.getElementById('contactMessage');
    subjectField.value = "";
    message.value = "";
}