// data/schemes.js

const schemes = {
  en: [
    {
      id: "pm_kisan",
      title: "PM-KISAN Samman Nidhi",
      type: "National",
      icon: "account-balance-wallet",
      summary: "Direct income support of ₹6,000 per year for farmer families.",
      details: {
        what_is_it: "This is a Central Government scheme that provides financial support to all landholding farmer families in the country to supplement their financial needs.",
        benefits: [
          "₹6,000 per year paid in three equal installments of ₹2,000.",
          "Funds are directly transferred to the bank account of the beneficiaries."
        ],
        who_can_apply: [
          "All landholding farmer families in the country.",
          "The family should consist of a husband, wife, and minor children.",
          "Institutional landholders and affluent farmers are excluded."
        ],
        how_to_apply: "Farmers can register through the official PM-KISAN portal online, or visit their nearest Common Service Centre (CSC) for assistance.",
        documents_needed: [
          "Aadhaar Card",
          "Citizenship certificate",
          "Landholding papers",
          "Bank account details"
        ],
        official_link: "https://pmkisan.gov.in/"
      }
    },
    {
      id: "pm_fby",
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      type: "National",
      icon: "umbrella",
      summary: "Crop insurance scheme to protect farmers against crop loss or damage.",
      details: {
        what_is_it: "PMFBY is the government-sponsored crop insurance scheme that integrates multiple stakeholders on a single platform to provide insurance cover for farmers.",
        benefits: [
          "Provides comprehensive insurance coverage against crop failure, helping to stabilize the income of farmers.",
          "Covers losses due to non-preventable natural risks, such as drought, floods, pests, and diseases.",
          "Low premium rates for farmers: 2% for Kharif, 1.5% for Rabi, and 5% for commercial/horticultural crops."
        ],
        who_can_apply: [
          "All farmers including sharecroppers and tenant farmers growing notified crops in the notified areas are eligible for coverage."
        ],
        how_to_apply: "Farmers can enroll through their nearest bank, Primary Agricultural Credit Society (PACS), CSC, or directly on the National Crop Insurance Portal (NCIP).",
        documents_needed: [
          "Land records (RoR, land possession certificate)",
          "Aadhaar card",
          "Bank passbook",
          "Sowing declaration"
        ],
        official_link: "https://pmfby.gov.in/"
      }
    },
    {
        id: "kcc",
        title: "Kisan Credit Card (KCC)",
        type: "National",
        icon: "credit-card",
        summary: "Provides affordable credit to farmers for their cultivation and other needs.",
        details: {
          what_is_it: "The KCC scheme aims at providing adequate and timely credit support from the banking system to farmers for their short-term credit requirements for cultivation of crops, post-harvest expenses, and other needs.",
          benefits: [
            "Flexible repayment options and a simple interest rate.",
            "Credit available for up to ₹3 lakh.",
            "Provides insurance coverage for cardholders against death and disability.",
            "Can be used for purchase of seeds, fertilizers, pesticides, etc."
          ],
          who_can_apply: [
            "All farmers - individuals/joint borrowers who are owner cultivators.",
            "Tenant farmers, oral lessees & sharecroppers.",
            "Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers."
          ],
          how_to_apply: "Farmers can apply for KCC at any commercial bank, regional rural bank, or cooperative bank by filling out a simple one-page form.",
          documents_needed: [
            "Duly filled application form",
            "Identity proof (Aadhaar, PAN, Voter ID)",
            "Address proof",
            "Land documents"
          ],
          official_link: "https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card"
        }
    },
    {
        id: "shc",
        title: "Soil Health Card (SHC) Scheme",
        type: "National",
        icon: "grass",
        summary: "Provides farmers with a report on their soil's health and nutrient status.",
        details: {
          what_is_it: "A government scheme to issue Soil Health Cards to farmers every 2 years. The card provides information on the nutrient status of the soil along with recommendations on the appropriate dosage of nutrients to be applied for improving soil health and fertility.",
          benefits: [
            "Helps farmers to improve soil health and increase crop productivity.",
            "Promotes balanced use of fertilizers, saving costs for the farmer.",
            "The card is prepared after testing the soil for 12 parameters.",
            "Provides crop-wise recommendations for nutrients and fertilizers."
          ],
          who_can_apply: [
            "All farmers across the country are eligible to get a Soil Health Card for their land holdings."
          ],
          how_to_apply: "A soil sample is collected from the farmer's field by a trained person. The sample is tested in a lab. A Soil Health Card is generated with the results and recommendations, and delivered to the farmer.",
          documents_needed: [
            "No specific documents required from the farmer. The process is managed by state agricultural departments."
          ],
          official_link: "https://soilhealth.dac.gov.in/"
        }
    },
    {
        id: "pm_kusum",
        title: "PM-KUSUM Scheme",
        type: "National",
        icon: "solar-power",
        summary: "Promotes the use of solar energy for agricultural purposes.",
        details: {
          what_is_it: "The Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM) scheme aims to increase farmers' income, provide a reliable source for irrigation, and de-dieselise the agriculture sector.",
          benefits: [
            "Subsidy for setting up standalone solar pumps.",
            "Financial assistance for solarising existing grid-connected agricultural pumps.",
            "Enables farmers to sell surplus solar power to the grid, creating an extra source of income."
          ],
          who_can_apply: [
            "Individual farmers",
            "Groups of farmers",
            "Farmer Producer Organisations (FPOs)",
            "Panchayats and Water User Associations."
          ],
          how_to_apply: "Farmers need to apply through the official portals of their respective state's energy department or discoms (electricity distribution companies) when applications are invited.",
          documents_needed: [
            "Aadhaar Card",
            "Land documents (Khasra Khatauni)",
            "Bank account details",
            "Declaration form"
          ],
          official_link: "https://pmkusum.mnre.gov.in/"
        }
    },

    {
    "id": "gmsavy",
    "title": "Gopinath Munde Shetkari Apghat Vima Yojana",
    "icon": "shield",
    "type": "State (Maharashtra)",
    "summary": "Provides accident insurance cover to farmers in the state.",
    "details": {
      "what_is_it": "This scheme provides financial support to the family of a farmer in case of accidental death or disability.",
      "benefits": [
        "Financial compensation of up to ₹2 lakh in case of accidental death or permanent disability.",
        "Compensation of up to ₹1 lakh for partial disability due to an accident."
      ],
      "who_can_apply": [
        "All farmers in Maharashtra aged between 10 and 75 years, whose name appears on the 7/12 land extract.",
        "The farmer's family does not have to pay any premium for this insurance."
      ],
      "how_to_apply": "In the unfortunate event of an accident, the farmer's family must submit a claim form along with required documents to the Taluka Agriculture Officer.",
      "documents_needed": [
        "7/12 extract, 8A extract",
        "FIR copy (in case of road accident, etc.)",
        "Post Mortem report",
        "Death Certificate",
        "Heir Certificate"
      ],
      "official_link": "https://krishi.maharashtra.gov.in/en/g-munde-shetkari-apghat-vima-yojana"
    }
  },
  {
    "id": "bffly",
    "title": "Bhausaheb Fundkar Falbag Lagvad Yojana",
    "icon": "park",
    "type": "State (Maharashtra)",
    "summary": "A horticulture scheme to encourage the plantation of orchards.",
    "details": {
      "what_is_it": "This scheme provides financial assistance to farmers for planting specific fruit crops, promoting diversification and increasing long-term income.",
      "benefits": [
        "100% subsidy provided for the cost of saplings, fertilizers, and other inputs over a period of three years.",
        "Covers a variety of fruit crops like Mango, Cashew, Guava, Pomegranate, etc.",
        "Promotes integrated pest management and modern horticultural practices."
      ],
      "who_can_apply": [
        "All farmers in Maharashtra are eligible.",
        "A minimum land area of 0.20 hectares and a maximum of 6 hectares is applicable."
      ],
      "how_to_apply": "Farmers can apply online through the 'Mahadbt' portal under the agriculture section when applications are open.",
      "documents_needed": [
        "7/12 and 8A extract (Land records)",
        "Aadhaar card linked bank account",
        "Caste certificate (if applicable for certain sub-schemes)"
      ],
      "official_link": "https://mahadbt.maharashtra.gov.in/"
    }
}
    ],
  hi: [
    {
      id: "pm_kisan",
      title: "पीएम-किसान सम्मान निधि",
      type: "राष्ट्रीय",
      icon: "account-balance-wallet",
      summary: "किसान परिवारों को प्रति वर्ष ₹6,000 की सीधी आय सहायता।",
      details: {
        what_is_it: "यह एक केंद्र सरकार की योजना है जो देश के सभी भूमिधारक किसान परिवारों को उनकी वित्तीय जरूरतों को पूरा करने के लिए वित्तीय सहायता प्रदान करती है।",
        benefits: [
          "प्रति वर्ष ₹6,000 का भुगतान ₹2,000 की तीन समान किस्तों में किया जाता है।",
          "धन सीधे लाभार्थियों के बैंक खाते में स्थानांतरित किया जाता है।"
        ],
        who_can_apply: [
          "देश के सभी भूमिधारक किसान परिवार।",
          "परिवार में पति, पत्नी और नाबालिग बच्चे शामिल होने चाहिए।",
          "संस्थागत भूमिधारकों और संपन्न किसानों को बाहर रखा गया है।"
        ],
        how_to_apply: "किसान आधिकारिक पीएम-किसान पोर्टल के माध्यम से ऑनलाइन पंजीकरण कर सकते हैं, या सहायता के लिए अपने निकटतम कॉमन सर्विस सेंटर (सीएससी) पर जा सकते हैं।",
        documents_needed: [
          "आधार कार्ड",
          "नागरिकता प्रमाण पत्र",
          "भूमि के कागजात",
          "बैंक खाता विवरण"
        ],
        official_link: "https://pmkisan.gov.in/"
      }
    },
    {
      id: "pm_fby",
      title: "प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाई)",
      type: "राष्ट्रीय",
      icon: "umbrella",
      summary: "फसल के नुकसान या क्षति के खिलाफ किसानों की सुरक्षा के लिए फसल बीमा योजना।",
      details: {
        what_is_it: "पीएमएफबीवाई सरकार द्वारा प्रायोजित फसल बीमा योजना है जो किसानों को बीमा कवर प्रदान करने के लिए कई हितधारकों को एक मंच पर एकीकृत करती है।",
        benefits: [
          "फसल खराब होने पर व्यापक बीमा कवरेज प्रदान करता है, जिससे किसानों की आय स्थिर करने में मदद मिलती है।",
          "सूखा, बाढ़, कीट और बीमारियों जैसे गैर-रोकथाम योग्य प्राकृतिक जोखिमों के कारण होने वाले नुकसान को कवर करता है।",
          "किसानों के लिए कम प्रीमियम दरें: खरीफ के लिए 2%, रबी के लिए 1.5%, और वाणिज्यिक/बागवानी फसलों के लिए 5%।"
        ],
        who_can_apply: [
          "अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान, जिनमें बटाईदार और किरायेदार किसान शामिल हैं, कवरेज के लिए पात्र हैं।"
        ],
        how_to_apply: "किसान अपने निकटतम बैंक, प्राथमिक कृषि ऋण समिति (PACS), CSC के माध्यम से, या सीधे राष्ट्रीय फसल बीमा पोर्टल (NCIP) पर नामांकन कर सकते हैं।",
        documents_needed: [
          "भूमि रिकॉर्ड (आरओआर, भूमि कब्जा प्रमाण पत्र)",
          "आधार कार्ड",
          "बैंक पासबुक",
          "बुवाई घोषणा पत्र"
        ],
        official_link: "https://pmfby.gov.in/"
      }
    },
    {
        id: "kcc",
        title: "किसान क्रेडिट कार्ड (केसीसी)",
        type: "राष्ट्रीय",
        icon: "credit-card",
        summary: "किसानों को उनकी खेती और अन्य जरूरतों के लिए सस्ता कर्ज प्रदान करता है।",
        details: {
          what_is_it: "केसीसी योजना का उद्देश्य किसानों को फसलों की खेती, कटाई के बाद के खर्चों और अन्य जरूरतों के लिए उनकी अल्पकालिक ऋण आवश्यकताओं के लिए बैंकिंग प्रणाली से पर्याप्त और समय पर ऋण सहायता प्रदान करना है।",
          benefits: [
            "लचीले पुनर्भुगतान विकल्प और एक साधारण ब्याज दर।",
            "₹3 लाख तक का ऋण उपलब्ध।",
            "कार्डधारकों को मृत्यु और विकलांगता के खिलाफ बीमा कवरेज प्रदान करता है।",
            "बीज, उर्वरक, कीटनाशक आदि की खरीद के लिए इस्तेमाल किया जा सकता है।"
          ],
          who_can_apply: [
            "सभी किसान - व्यक्ति/संयुक्त उधारकर्ता जो मालिक कृषक हैं।",
            "किरायेदार किसान, मौखिक पट्टेदार और बटाईदार।",
            "किसानों के स्वयं सहायता समूह (एसएचजी) या संयुक्त देयता समूह (जेएलजी)।"
          ],
          how_to_apply: "किसान किसी भी वाणिज्यिक बैंक, क्षेत्रीय ग्रामीण बैंक या सहकारी बैंक में एक साधारण एक-पृष्ठ का फॉर्म भरकर केसीसी के लिए आवेदन कर सकते हैं।",
          documents_needed: [
            "विधिवत भरा हुआ आवेदन पत्र",
            "पहचान प्रमाण (आधार, पैन, वोटर आईडी)",
            "पते का सबूत",
            "भूमि के दस्तावेज"
          ],
          official_link: "https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card"
        }
    },
    {
        id: "shc",
        title: "मृदा स्वास्थ्य कार्ड (एसएचसी) योजना",
        type: "राष्ट्रीय",
        icon: "grass",
        summary: "किसानों को उनकी मिट्टी के स्वास्थ्य और पोषक तत्वों की स्थिति पर एक रिपोर्ट प्रदान करता है।",
        details: {
          what_is_it: "किसानों को हर 2 साल में मृदा स्वास्थ्य कार्ड जारी करने की एक सरकारी योजना। कार्ड मिट्टी के स्वास्थ्य और उर्वरता में सुधार के लिए लागू किए जाने वाले पोषक तत्वों की उचित खुराक पर सिफारिशों के साथ मिट्टी की पोषक स्थिति के बारे में जानकारी प्रदान करता है।",
          benefits: [
            "किसानों को मिट्टी के स्वास्थ्य में सुधार करने और फसल उत्पादकता बढ़ाने में मदद करता है।",
            "उर्वरकों के संतुलित उपयोग को बढ़ावा देता है, जिससे किसान की लागत बचती है।",
            "कार्ड 12 मापदंडों के लिए मिट्टी का परीक्षण करने के बाद तैयार किया जाता है।",
            "पोषक तत्वों और उर्वरकों के लिए फसल-वार सिफारिशें प्रदान करता है।"
          ],
          who_can_apply: [
            "देश भर के सभी किसान अपनी भूमि के लिए मृदा स्वास्थ्य कार्ड प्राप्त करने के पात्र हैं।"
          ],
          how_to_apply: "एक प्रशिक्षित व्यक्ति द्वारा किसान के खेत से मिट्टी का नमूना एकत्र किया जाता है। नमूने का प्रयोगशाला में परीक्षण किया जाता है। परिणामों और सिफारिशों के साथ एक मृदा स्वास्थ्य कार्ड बनाया जाता है, और किसान को दिया जाता है।",
          documents_needed: [
            "किसान से किसी विशिष्ट दस्तावेज की आवश्यकता नहीं है। यह प्रक्रिया राज्य के कृषि विभागों द्वारा प्रबंधित की जाती है।"
          ],
          official_link: "https://soilhealth.dac.gov.in/"
        }
    },
    {
        id: "pm_kusum",
        title: "पीएम-कुसुम योजना",
        type: "राष्ट्रीय",
        icon: "solar-power",
        summary: "कृषि उद्देश्यों के लिए सौर ऊर्जा के उपयोग को बढ़ावा देता है।",
        details: {
          what_is_it: "प्रधानमंत्री किसान ऊर्जा सुरक्षा एवं उत्थान महाभियान (पीएम-कुसुम) योजना का उद्देश्य किसानों की आय बढ़ाना, सिंचाई के लिए एक विश्वसनीय स्रोत प्रदान करना और कृषि क्षेत्र को डी-डीजलाइज करना है।",
          benefits: [
            "स्टैंडअलोन सोलर पंप स्थापित करने के लिए सब्सिडी।",
            "मौजूदा ग्रिड से जुड़े कृषि पंपों को सोलराइज करने के लिए वित्तीय सहायता।",
            "किसानों को अतिरिक्त सौर ऊर्जा ग्रिड को बेचने में सक्षम बनाता है, जिससे आय का एक अतिरिक्त स्रोत बनता है।"
          ],
          who_can_apply: [
            "व्यक्तिगत किसान",
            "किसानों के समूह",
            "किसान उत्पादक संगठन (एफपीओ)",
            "पंचायतें और जल उपयोगकर्ता संघ।"
          ],
          how_to_apply: "किसानों को अपने संबंधित राज्य के ऊर्जा विभाग या डिस्कॉम (बिजली वितरण कंपनियों) के आधिकारिक पोर्टलों के माध्यम से आवेदन करने की आवश्यकता है, जब आवेदन आमंत्रित किए जाते हैं।",
          documents_needed: [
            "आधार कार्ड",
            "भूमि के दस्तावेज (खसरा खतौनी)",
            "बैंक खाता विवरण",
            "घोषणा पत्र"
          ],
          official_link: "https://pmkusum.mnre.gov.in/"
        }
    },
    {
    "id": "gmsavy",
    "title": "गोपीनाथ मुंडे शेतकरी अपघात विमा योजना",
    "icon": "shield",
    "type": "राज्य (महाराष्ट्र)",
    "summary": "राज्य में किसानों को दुर्घटना बीमा कवर प्रदान करता है।",
    "details": {
        "what_is_it": "यह योजना आकस्मिक मृत्यु या विकलांगता की स्थिति में किसान के परिवार को वित्तीय सहायता प्रदान करती है।",
        "benefits": ["आकस्मिक मृत्यु या स्थायी विकलांगता की स्थिति में ₹2 लाख तक का वित्तीय मुआवजा।","दुर्घटना के कारण आंशिक विकलांगता के लिए ₹1 लाख तक का मुआवजा।"],
        "who_can_apply": ["महाराष्ट्र में 10 से 75 वर्ष की आयु के सभी किसान, जिनका नाम 7/12 भूमि उद्धरण पर है।","इस बीमा के लिए किसान के परिवार को कोई प्रीमियम नहीं देना पड़ता है।"],
        "how_to_apply": "दुर्घटना की दुर्भाग्यपूर्ण घटना में, किसान के परिवार को आवश्यक दस्तावेजों के साथ तालुका कृषि अधिकारी को एक दावा प्रपत्र प्रस्तुत करना होगा।",
        "documents_needed": ["7/12 उतारा, 8A उतारा","एफआईआर कॉपी (सड़क दुर्घटना आदि के मामले में)","पोस्टमार्टम रिपोर्ट","मृत्यु प्रमाण पत्र","उत्तराधिकार प्रमाण पत्र"],
        "official_link": "https://krishi.maharashtra.gov.in/mr/g-munde-shetkari-apghat-vima-yojana"
    }
},
{
    "id": "bffly",
    "title": "भाऊसाहेब फुंडकर फळबाग लागवड योजना",
    "icon": "park",
    "type": "राज्य (महाराष्ट्र)",
    "summary": "फळबागांच्या लागवडीला प्रोत्साहन देण्यासाठी एक फलोत्पादन योजना।",
    "details": {
        "what_is_it": "यह योजना किसानों को विशिष्ट फल फसलों के रोपण, विविधीकरण को बढ़ावा देने और दीर्घकालिक आय बढ़ाने के लिए वित्तीय सहायता प्रदान करती है।",
        "benefits": ["तीन साल की अवधि में पौधे, उर्वरक और अन्य आदानों की लागत के लिए 100% सब्सिडी प्रदान की जाती है।","आम, काजू, अमरूद, अनार आदि जैसी विभिन्न फल फसलों को शामिल करता है।","एकीकृत कीट प्रबंधन और आधुनिक बागवानी प्रथाओं को बढ़ावा देता है।"],
        "who_can_apply": ["महाराष्ट्र के सभी किसान पात्र हैं।","न्यूनतम 0.20 हेक्टेयर और अधिकतम 6 हेक्टेयर भूमि क्षेत्र लागू है।"],
        "how_to_apply": "आवेदन खुले होने पर किसान 'महाडीबीटी' पोर्टल के माध्यम से कृषि अनुभाग के तहत ऑनलाइन आवेदन कर सकते हैं।",
        "documents_needed": ["7/12 और 8A उतारा (भूमि रिकॉर्ड)","आधार कार्ड से जुड़ा बैंक खाता","जाति प्रमाण पत्र (यदि कुछ उप-योजनाओं के लिए लागू हो)"],
        "official_link": "https://mahadbt.maharashtra.gov.in/"
    }
}
  ],
  mr: [
    {
      id: "pm_kisan",
      title: "पीएम-किसान सन्मान निधी",
      type: "राष्ट्रीय",
      icon: "account-balance-wallet",
      summary: "शेतकरी कुटुंबांना प्रतिवर्षी ₹6,000 थेट उत्पन्न सहाय्य.",
      details: {
        what_is_it: "ही एक केंद्र सरकारची योजना आहे जी देशातील सर्व भूधारक शेतकरी कुटुंबांना त्यांच्या आर्थिक गरजा पूर्ण करण्यासाठी आर्थिक सहाय्य प्रदान करते.",
        benefits: [
          "प्रतिवर्षी ₹6,000, ₹2,000 च्या तीन समान हप्त्यांमध्ये दिले जातात.",
          "निधी थेट लाभार्थ्यांच्या बँक खात्यात हस्तांतरित केला जातो."
        ],
        who_can_apply: [
          "देशातील सर्व भूधारक शेतकरी कुटुंबे.",
          "कुटुंबामध्ये पती, पत्नी आणि अल्पवयीन मुले यांचा समावेश असावा.",
          "संस्थात्मक जमीनधारक आणि श्रीमंत शेतकऱ्यांना वगळण्यात आले आहे."
        ],
        how_to_apply: "शेतकरी अधिकृत पीएम-किसान पोर्टलद्वारे ऑनलाइन नोंदणी करू शकतात किंवा मदतीसाठी त्यांच्या जवळच्या कॉमन सर्व्हिस सेंटर (सीएससी) ला भेट देऊ शकतात.",
        documents_needed: [
          "आधार कार्ड",
          "नागरिकत्व प्रमाणपत्र",
          "जमिनीची कागदपत्रे",
          "बँक खात्याचा तपशील"
        ],
        official_link: "https://pmkisan.gov.in/"
      }
    },
    {
      id: "pm_fby",
      title: "प्रधानमंत्री फसल विमा योजना (पीएमएफबीवाय)",
      type: "राष्ट्रीय",
      icon: "umbrella",
      summary: "पीक नुकसान किंवा नुकसानीपासून शेतकऱ्यांचे संरक्षण करण्यासाठी पीक विमा योजना.",
      details: {
        what_is_it: "पीएमएफबीवाय ही सरकार-प्रायोजित पीक विमा योजना आहे जी शेतकऱ्यांना विमा संरक्षण प्रदान करण्यासाठी एकाच व्यासपीठावर अनेक भागधारकांना एकत्रित करते.",
        benefits: [
          "पीक अपयशाविरूद्ध व्यापक विमा संरक्षण प्रदान करते, ज्यामुळे शेतकऱ्यांचे उत्पन्न स्थिर होण्यास मदत होते.",
          "दुष्काळ, पूर, कीटक आणि रोग यांसारख्या नैसर्गिक धोक्यांमुळे होणारे नुकसान कव्हर करते.",
          "शेतकऱ्यांसाठी कमी प्रीमियम दर: खरीपसाठी 2%, रबीसाठी 1.5% आणि व्यावसायिक/बागायती पिकांसाठी 5%."
        ],
        who_can_apply: [
          "अधिसूचित क्षेत्रांमध्ये अधिसूचित पिके घेणारे सर्व शेतकरी, भाडेकरू आणि वाटेकरी शेतकरी संरक्षणासाठी पात्र आहेत."
        ],
        how_to_apply: "शेतकरी त्यांच्या जवळच्या बँकेत, प्राथमिक कृषी पतसंस्थेत (PACS), सीएससीमध्ये किंवा थेट राष्ट्रीय पीक विमा पोर्टलवर (NCIP) नावनोंदणी करू शकतात.",
        documents_needed: [
          "जमिनीची नोंद (RoR, जमीन धारणा प्रमाणपत्र)",
          "आधार कार्ड",
          "बँक पासबुक",
          "पेरणी घोषणापत्र"
        ],
        official_link: "https://pmfby.gov.in/"
      }
    },
    {
        id: "kcc",
        title: "किसान क्रेडिट कार्ड (केसीसी)",
        type: "राष्ट्रीय",
        icon: "credit-card",
        summary: "शेतकऱ्यांना त्यांच्या शेती आणि इतर गरजांसाठी स्वस्त कर्ज उपलब्ध करून देते.",
        details: {
          what_is_it: "केसीसी योजनेचा उद्देश शेतकऱ्यांना पिकांची लागवड, काढणीनंतरचे खर्च आणि इतर गरजांसाठी त्यांच्या अल्प मुदतीच्या पत गरजांसाठी बँकिंग प्रणालीकडून पुरेशी आणि वेळेवर पतपुरवठा करणे आहे.",
          benefits: [
            "लवचिक परतफेड पर्याय आणि साधा व्याज दर.",
            "₹3 लाखांपर्यंत पत उपलब्ध.",
            "कार्डधारकांना मृत्यू आणि अपंगत्वापासून विमा संरक्षण प्रदान करते.",
            "बियाणे, खते, कीटकनाशके इत्यादींच्या खरेदीसाठी वापरले जाऊ शकते."
          ],
          who_can_apply: [
            "सर्व शेतकरी - वैयक्तिक/संयुक्त कर्जदार जे मालक लागवडदार आहेत.",
            "भाडेकरू शेतकरी, तोंडी भाडेपट्टेधारक आणि वाटेकरी.",
            "शेतकऱ्यांचे बचत गट (SHGs) किंवा संयुक्त दायित्व गट (JLGs)."
          ],
          how_to_apply: "शेतकरी कोणत्याही व्यावसायिक बँकेत, प्रादेशिक ग्रामीण बँकेत किंवा सहकारी बँकेत एक साधा एक-पानाचा फॉर्म भरून केसीसीसाठी अर्ज करू शकतात.",
          documents_needed: [
            "व्यवस्थित भरलेला अर्ज",
            "ओळख पुरावा (आधार, पॅन, मतदार ओळखपत्र)",
            "पत्त्याचा पुरावा",
            "जमिनीची कागदपत्रे"
          ],
          official_link: "https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card"
        }
    },
    {
        id: "shc",
        title: "मृदा आरोग्य कार्ड (एसएचसी) योजना",
        type: "राष्ट्रीय",
        icon: "grass",
        summary: "शेतकऱ्यांना त्यांच्या जमिनीच्या आरोग्यावर आणि पोषक तत्वांच्या स्थितीवर अहवाल प्रदान करते.",
        details: {
          what_is_it: "शेतकऱ्यांना दर 2 वर्षांनी मृदा आरोग्य कार्ड जारी करण्याची सरकारी योजना. हे कार्ड जमिनीच्या आरोग्याची आणि सुपीकतेची सुधारणा करण्यासाठी पोषक तत्वांच्या योग्य मात्रेवरील शिफारशींसह जमिनीच्या पोषक स्थितीबद्दल माहिती प्रदान करते.",
          benefits: [
            "शेतकऱ्यांना जमिनीचे आरोग्य सुधारण्यास आणि पीक उत्पादकता वाढविण्यात मदत करते.",
            "खतांच्या संतुलित वापरास प्रोत्साहन देते, ज्यामुळे शेतकऱ्यांच्या खर्चात बचत होते.",
            "हे कार्ड जमिनीच्या 12 पॅरामीटर्सची चाचणी केल्यानंतर तयार केले जाते.",
            "पोषक तत्वे आणि खतांसाठी पीक-निहाय शिफारसी प्रदान करते."
          ],
          who_can_apply: [
            "देशभरातील सर्व शेतकरी त्यांच्या जमिनीसाठी मृदा आरोग्य कार्ड मिळविण्यास पात्र आहेत."
          ],
          how_to_apply: "एका प्रशिक्षित व्यक्तीद्वारे शेतकऱ्याच्या शेतातून मातीचा नमुना गोळा केला जातो. नमुन्याची प्रयोगशाळेत चाचणी केली जाते. परिणाम आणि शिफारशींसह एक मृदा आरोग्य कार्ड तयार केले जाते आणि शेतकऱ्याला दिले जाते.",
          documents_needed: [
            "शेतकऱ्याकडून कोणत्याही विशिष्ट कागदपत्रांची आवश्यकता नाही. ही प्रक्रिया राज्य कृषी विभागांद्वारे व्यवस्थापित केली जाते."
          ],
          official_link: "https://soilhealth.dac.gov.in/"
        }
    },
    {
        id: "pm_kusum",
        title: "पीएम-कुसुम योजना",
        type: "राष्ट्रीय",
        icon: "solar-power",
        summary: "कृषी उद्देशांसाठी सौर ऊर्जेच्या वापरास प्रोत्साहन देते.",
        details: {
          what_is_it: "प्रधानमंत्री किसान ऊर्जा सुरक्षा एवं उत्थान महाभियान (पीएम-कुसुम) योजनेचे उद्दिष्ट शेतकऱ्यांचे उत्पन्न वाढवणे, सिंचनासाठी एक विश्वसनीय स्रोत प्रदान करणे आणि कृषी क्षेत्राला डिझेलमुक्त करणे आहे.",
          benefits: [
            "स्वतंत्र सौर पंप बसवण्यासाठी अनुदान.",
            "विद्यमान ग्रीड-कनेक्टेड कृषी पंपांचे सौरीकरण करण्यासाठी आर्थिक सहाय्य.",
            "शेतकऱ्यांना अतिरिक्त सौर ऊर्जा ग्रीडला विकण्यास सक्षम करते, ज्यामुळे उत्पन्नाचा अतिरिक्त स्रोत निर्माण होतो."
          ],
          who_can_apply: [
            "वैयक्तिक शेतकरी",
            "शेतकऱ्यांचे गट",
            "शेतकरी उत्पादक संस्था (FPOs)",
            "पंचायती आणि पाणी वापरकर्ता संघटना."
          ],
          how_to_apply: "शेतकऱ्यांनी अर्ज आमंत्रित केल्यावर त्यांच्या संबंधित राज्याच्या ऊर्जा विभागाच्या किंवा डिस्कॉमच्या (वीज वितरण कंपन्या) अधिकृत पोर्टलद्वारे अर्ज करणे आवश्यक आहे.",
          documents_needed: [
            "आधार कार्ड",
            "जमिनीची कागदपत्रे (खसरा खतौनी)",
            "बँक खात्याचा तपशील",
            "घोषणापत्र"
          ],
          official_link: "https://pmkusum.mnre.gov.in/"
        }
    },
    {
    "id": "gmsavy",
    "title": "गोपीनाथ मुंडे शेतकरी अपघात विमा योजना",
    "icon": "shield",
    "type": "राज्य (महाराष्ट्र)",
    "summary": "राज्यातील शेतकऱ्यांना अपघात विमा संरक्षण प्रदान करते.",
    "details": {
        "what_is_it": "अपघाती मृत्यू किंवा अपंगत्व आल्यास शेतकऱ्याच्या कुटुंबाला आर्थिक सहाय्य देण्यासाठी ही योजना आहे.",
        "benefits": ["अपघाती मृत्यू किंवा कायमचे अपंगत्व आल्यास ₹2 लाखांपर्यंत आर्थिक भरपाई.","अपघातामुळे अंशिक अपंगत्व आल्यास ₹1 लाखांपर्यंत भरपाई."],
        "who_can_apply": ["महाराष्ट्रातील 10 ते 75 वर्षे वयोगटातील सर्व शेतकरी, ज्यांचे नाव 7/12 उताऱ्यावर आहे.","या विम्यासाठी शेतकऱ्याच्या कुटुंबाला कोणताही हप्ता भरावा लागत नाही."],
        "how_to_apply": "अपघात घडल्यास, शेतकऱ्याच्या कुटुंबाने आवश्यक कागदपत्रांसह तालुका कृषी अधिकाऱ्याकडे दावा अर्ज सादर करणे आवश्यक आहे.",
        "documents_needed": ["7/12 उतारा, 8A उतारा","एफआयआर प्रत (रस्ता अपघात इ. झाल्यास)","पोस्ट मार्टेम अहवाल","मृत्यूचा दाखला","वारस प्रमाणपत्र"],
        "official_link": "https://krishi.maharashtra.gov.in/mr/g-munde-shetkari-apghat-vima-yojana"
    }
},
{
    "id": "bffly",
    "title": "भाऊसाहेब फुंडकर फळबाग लागवड योजना",
    "icon": "park",
    "type": "राज्य (महाराष्ट्र)",
    "summary": "फळबागांच्या लागवडीला प्रोत्साहन देण्यासाठी एक फलोत्पादन योजना.",
    "details": {
        "what_is_it": "ही योजना शेतकऱ्यांना विशिष्ट फळपिकांच्या लागवडीसाठी, विविधतेला प्रोत्साहन देण्यासाठी आणि दीर्घकालीन उत्पन्न वाढवण्यासाठी आर्थिक सहाय्य पुरवते.",
        "benefits": ["तीन वर्षांच्या कालावधीत रोपे, खते आणि इतर निविष्ठांच्या खर्चासाठी 100% अनुदान दिले जाते.","आंबा, काजू, पेरू, डाळिंब इत्यादी विविध फळपिकांना संरक्षण देते.","एकात्मिक कीड व्यवस्थापन आणि आधुनिक फलोत्पादन पद्धतींना प्रोत्साहन देते."],
        "who_can_apply": ["महाराष्ट्रातील सर्व शेतकरी पात्र आहेत.","किमान 0.20 हेक्टर आणि कमाल 6 हेक्टर क्षेत्र मर्यादा लागू आहे."],
        "how_to_apply": "अर्ज खुले असताना शेतकरी 'महाडीबीटी' पोर्टलवर कृषी विभागांतर्गत ऑनलाइन अर्ज करू शकतात.",
        "documents_needed": ["7/12 आणि 8A उतारा (जमिनीची कागदपत्रे)","आधार कार्ड लिंक केलेले बँक खाते","जातीचा दाखला (काही उप-योजनांसाठी लागू असल्यास)"],
        "official_link": "https://mahadbt.maharashtra.gov.in/"
    }
}
  ]
};

export default schemes;