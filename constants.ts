import { Question, FootballerProfile } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Wat is je favoriete muzieksoort?",
    choices: [
      { id: 'pop_dance', label: 'Pop / Dance', categories: ['Sociaal', 'Optimistisch'] },
      { id: 'rock_metal', label: 'Rock / Metal', categories: ['Assertief', 'Energiek'] },
      { id: 'klassiek_jazz', label: 'Klassiek / Jazz', categories: ['Bedachtzaam', 'Gestructureerd'] },
      { id: 'hiphop_rnb', label: 'Hiphop / R&B', categories: ['Expressief', 'Sociaal'] },
    ]
  },
  {
    id: 2,
    text: "Wat doe je het liefst in je vrije tijd?",
    choices: [
      { id: 'sporten', label: 'Sporten', categories: ['Actief', 'Doorzetter'] },
      { id: 'lezen_tekenen', label: 'Lezen / Tekenen', categories: ['Rustig', 'Reflectief'] },
      { id: 'gamen_programmeren', label: 'Gamen / Programmeren', categories: ['Analytisch', 'Gefocust'] },
      { id: 'afspreken_vrienden', label: 'Afspreken met vrienden', categories: ['Sociaal', 'Enthousiast'] },
      { id: 'koken_bakken', label: 'Koken / Bakken', categories: ['Zorgzaam', 'Creatief'] },
    ]
  },
  {
    id: 3,
    text: "Wat is je ideale vakantie?",
    choices: [
      { id: 'strandvakantie', label: 'Strandvakantie', categories: ['Rustzoeker', 'Sociaal'] },
      { id: 'stedentrip', label: 'Stedentrip', categories: ['Nieuwsgierig', 'Cultureel'] },
      { id: 'bergwandeling', label: 'Bergwandeling', categories: ['Doorzetter', 'Natuurminner'] },
      { id: 'roadtrip', label: 'Roadtrip', categories: ['Spontaan', 'Vrijheidslievend'] },
    ]
  }
];

export const FOOTBALLERS: FootballerProfile[] = [
  {
    name: "Ronaldinho",
    traits: ['Sociaal', 'Creatief'],
    description: "De definitie van sociale creativiteit. Hij speelde met een constante glimlach, veranderde elke wedstrijd in een carnaval en maakte overal verbinding met fans.",
    rationale: "Hij speelde met een constante glimlach. Hij was de definitie van sociale creativiteit."
  },
  {
    name: "Rodri",
    traits: ['Rustig', 'Reflectief'],
    description: "Een rustige autoriteit op het middenveld. Hij is zeer intelligent, studeert management/economie en brengt een kalme, reflecterende aanwezigheid in een chaotische wedstrijd.",
    rationale: "Een rustige autoriteit op het middenveld."
  },
  {
    name: "Cristiano Ronaldo",
    traits: ['Actief', 'Doorzetter'],
    description: "Fysiek rusteloos, altijd aan het trainen, altijd in beweging. Mentaal onverwoestbaar, geobsedeerd door de beste te zijn, en weigert toe te staan dat iemand (of zijn eigen leeftijd) hem tegenhoudt.",
    rationale: "Fysiek rusteloos, altijd aan het trainen, altijd in beweging."
  },
  {
    name: "Roy Keane",
    traits: ['Assertief', 'Energiek'],
    description: "The ultimate assertiveness. Hij eiste perfectie, speelde met woedende energie en intimideerde tegenstanders voordat de wedstrijd zelfs maar begon.",
    rationale: "The ultimate assertiveness. He demanded perfection."
  },
  {
    name: "Joshua Kimmich",
    traits: ['Bedachtzaam', 'Gestructureerd'],
    description: "De spirituele opvolger van Lahm. Hij is geobsedeerd door structuur, discipline en het begrijpen van de tactische nuances van het spel.",
    rationale: "De spirituele opvolger van Lahm."
  },
  {
    name: "Lionel Messi",
    traits: ['Creatief', 'Introvert'], // Note: We need to map logic to hit this. 'Introvert' isn't a direct answer category but we can infer or use 'Rustig' as proxy if needed.
    description: "Misschien wel de beroemdste introvert in de sportgeschiedenis. Hij mijdt de schijnwerpers, houdt zijn privéleven privé, maar is de meest creatieve kracht die het voetbal ooit heeft gezien.",
    rationale: "Misschien wel de beroemdste introvert in de sportgeschiedenis."
  },
  {
    name: "Sócrates",
    traits: ['Nieuwsgierig', 'Cultureel'],
    description: "Bijnaam 'De Dokter'; hij behaalde daadwerkelijk een diploma in de geneeskunde terwijl hij profvoetbal speelde. Een van de weinige legendes die een gekwalificeerde arts is.",
    rationale: "Hij had niet alleen de bijnaam 'De Dokter'; hij behaalde daadwerkelijk een diploma."
  },
  {
    name: "Zlatan Ibrahimović",
    traits: ['Spontaan', 'Vrijheidslievend'],
    description: "Hij definieert zijn eigen tijdperk. Hij volgt geen andere regels dan die van hemzelf ('Zlatan rules') en speelt met een spontane, acrobatische stijl.",
    rationale: "Hoewel hij onlangs met pensioen is gegaan, definieert hij dit tijdperk."
  },
  {
    name: "Johan Cruyff",
    traits: ['Zorgzaam', 'Creatief'],
    description: "Een creatieve revolutionair op het veld die de Cruyff Foundation heeft opgericht om kinderen te helpen sporten, wat een diepe zorgzame kant laat zien.",
    rationale: "Een creatieve revolutionair op het veld."
  },
  {
    name: "Edinson Cavani",
    traits: ['Doorzetter', 'Natuurminner'],
    description: "Bekend als 'El Matador' vanwege zijn onophoudelijke werklust, maar buiten het veld is hij een gepassioneerde buitenmens die houdt van boeren en wandelen in Uruguay.",
    rationale: "Bekend als 'El Matador' vanwege zijn onophoudelijke werklust."
  }
];
