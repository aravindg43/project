export const mockHospitalData = [
  {
    hospital: {
      name: "Brentwood Behavioral Healthcare",
      telephone: "601-936-2024",
      address: {
        addressLineOne: "3531 Lakeland Dr",
        addressLineTwo: "",
        city: "Flowood",
        state: "MS",
        zip: "39232"
      },
      isKneeAndHipCert: false,
      isSpineCert: false,
      isCardiacCert: false,
      isMaternityCare: false,
      providerId: "",
      extendedHoursFlag: false
    }
  },  {
    hospital: {
      name: "Merit Health River Oaks",
      telephone: "601-932-1030",
      address: {
        addressLineOne: "1030 River Oaks Dr",
        addressLineTwo: "",
        city: "Flowood",
        state: "MS",
        zip: "39232"
      },
      isKneeAndHipCert: false,
      isSpineCert: true,
      isCardiacCert: false,
      isMaternityCare: false,
      providerId: "",
      extendedHoursFlag: false
    }
  },
  // ... more hospital entries follow in the same format
];
