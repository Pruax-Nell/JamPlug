export const groupedEuropeanCountries = [
    {
        label: "all",
        options: ["All"]
    },
    {
        label: "United Kingdom",
        options: ["England", "Ireland", "Northern Ireland", "Scotland", "Wales"].sort()
    },
    {
        label: "International",
        options: [
            "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", 
            "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", 
            "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", 
            "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", 
            "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", 
            "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", 
            "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", 
            "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", 
            "Ukraine", "Vatican City", "Åland Islands"
        ].sort()
    }
];

// Flat list helper
export const allEuropeanCountries = groupedEuropeanCountries.flatMap(group => group.options);