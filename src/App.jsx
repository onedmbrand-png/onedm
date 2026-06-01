import { useState, useEffect, useRef, createContext, useContext } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   ONEDM · Complete App
   Pages: Home · Partners · PartnerConfirm
   Palette: Horizonte
   Languages: PT · EN · FR · ES
═══════════════════════════════════════════════════════════════════════════ */

/* ─── PALETTE ────────────────────────────────────────────────────────────── */
const H = {
  bg:"#F7F4EF", bgAlt:"#FFFFFF", bgDark:"#120E28",
  primary:"#3D2FE8", primaryLight:"rgba(61,47,232,0.07)", primaryBorder:"rgba(61,47,232,0.16)",
  coral:"#FF5C3A", coralLight:"rgba(255,92,58,0.07)", coralBorder:"rgba(255,92,58,0.2)",
  mint:"#00B894", mintLight:"rgba(0,184,148,0.07)", mintBorder:"rgba(0,184,148,0.2)",
  amber:"#F0A500", purple:"#6C5CE7",
  text:"#120E28", textSub:"#6B6080", textMuted:"#B0A8C0",
  border:"rgba(18,14,40,0.08)", borderMed:"rgba(18,14,40,0.13)",
  shadow:"0 4px 24px rgba(18,14,40,0.07)", shadowLg:"0 20px 60px rgba(18,14,40,0.12)",
};


/* ─── MOBILE HOOK ── */
function useIsMobile() {
  const [mobile, setMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mobile;
}

/* ─── LANGUAGES ──────────────────────────────────────────────────────────── */
const LANGS = {
  PT: { flag:"🇵🇹", label:"PT", name:"Português" },
  EN: { flag:"🇬🇧", label:"EN", name:"English" },
  FR: { flag:"🇫🇷", label:"FR", name:"Français" },
  ES: { flag:"🇪🇸", label:"ES", name:"Español" },
};

const T = {
  PT: {
    tagline:"One Destination Manager",
    heroTitle:"O mundo inteiro,",
    heroTitleEm:"gerido por ti.",
    heroSub:"Planeia refeições com as tuas macros, cria roteiros, faz reservas e descobre culturas — antes de sair de casa.",
    waitlistPlaceholder:"o.teu@email.com",
    waitlistBtn:"Entrar →",
    waitlistSub:"312 pessoas na lista · Acesso early gratuito · Sem spam",
    waitlistDone:"Estás dentro.",
    waitlistDoneSub:"Serás dos primeiros a explorar o ONEDM.",
    navProduct:"Produto", navDestinos:"Destinos", navPartners:"Para Parceiros",
    statsCountries:"Países", statsInstances:"Instâncias", statsPersonalized:"Personalizado", statsPlatform:"Plataforma",
    destTitle:"Explorar Destinos",
    destSubtitle:"De Tóquio a Maputo,", destSubtitleEm:"tudo conectado.",
    destMore:"de 180+ países →",
    demoLabel:"Demo Interactivo",
    demoTitle:"Experimenta o",
    tabItinerary:"🗺️ Roteiro", tabMeal:"🍽️ Refeição",
    culturalLabel:"Visão Futura",
    culturalTitle:"Culturas que se", culturalTitleEm:"encontram.",
    culturalSub:"Instâncias turísticas de todo o mundo partilham a sua identidade. Antes de chegares, já conheces o lugar.",
    howTitle:"Quatro passos,", howTitleEm:"viagem completa.",
    steps:[
      { n:"01", icon:"🔍", title:"Descobre",    desc:"Pesquisa qualquer destino e explora instâncias curadas." },
      { n:"02", icon:"📍", title:"Planeia",     desc:"Cria o teu roteiro visual com reservas integradas." },
      { n:"03", icon:"⚖️", title:"Personaliza", desc:"Define as tuas macros para cada refeição da viagem." },
      { n:"04", icon:"✈️", title:"Viaja",       desc:"Chega e vive. Tudo está preparado." },
    ],
    ctaLabel:"O teu próximo capítulo",
    ctaTitle:"O destino começa", ctaTitleEm:"aqui.",
    ctaSub:"Os primeiros utilizadores moldam o produto e ganham acesso gratuito vitalício.",
    ctaPartnerBtn:"Tens um espaço turístico? → Torna-te parceiro",
    mealConfig:"Configurar refeição", mealResult:"A tua refeição",
    mealDestLabel:"Destino", mealProtLabel:"Proteína", mealCarbLabel:"Hidrato de Carbono",
    mealGenerateBtn:"✦  Gerar Prato Local", mealGenerating:"A gerar…",
    mealLoading:"A consultar chefs em",
    mealEmpty:"Configura as tuas macros e gera um prato autêntico de",
    mealWhere:"📍 Onde encontrar", mealTech:"🔪 Técnica", mealDid:"💡 Sabias que",
    itiHeader:"Tóquio · Dia Completo", itiSub:"6 paragens · 09h00–21h30 · Tudo reservado",
    itiMap:"Ver no mapa", itiReserve:"Reservar", itiMacros:"Personalizar macros", itiDetails:"Detalhes",
    partnersProgram:"ONEDM · Programa de Parceiros",
    partnersUrgency:"Apenas", partnersVagas:"vagas de parceiro fundador disponíveis",
    partnersHeroTitle:"O teu espaço,", partnersHeroTitle2:"visto pelo", partnersHeroTitleEm:"mundo inteiro.",
    partnersHeroSub:"O ONEDM leva instâncias turísticas de Moçambique a viajantes internacionais que planeiam tudo antes de sair de casa.",
    partnersJoin:"Quero ser parceiro →",
    partnersSeeApp:"← Ver a plataforma",
    partnersTravellers:"Viajantes na lista", partnersCountries:"Países de origem", partnersFree:"No lançamento", partnersSlots:"Vagas restantes",
    benefitsLabel:"O que ganhas",
    benefitsTitle:"Mais do que visibilidade.", benefitsTitleEm:"Negócio real.",
    benefits:[
      { icon:"📅", title:"Reservas antecipadas garantidas",    desc:"Os viajantes chegam com reservas feitas semanas antes. Zero cancelamentos surpresa.", stat:"+40%",  statLabel:"receita previsível" },
      { icon:"🍽️", title:"Pedidos alimentares já prontos",     desc:"Cada cliente envia as suas macros com antecedência. A cozinha prepara exactamente o que foi pedido.", stat:"0", statLabel:"desperdício alimentar" },
      { icon:"🌍", title:"Exposição a viajantes internacionais",desc:"O teu espaço aparece nos roteiros de viajantes de todo o mundo antes de partirem.", stat:"180+", statLabel:"países de origem" },
      { icon:"✦",  title:"Perfil cultural no mapa global",     desc:"Partilha a identidade e história do teu espaço. Chega quem já te conhece.", stat:"100%", statLabel:"visitantes qualificados" },
    ],
    howPartnerLabel:"Como funciona",
    howPartnerTitle:"Do pedido à primeira", howPartnerTitleEm:"reserva internacional.",
    partnerSteps:[
      { n:"01", title:"Submetes o pedido",       desc:"Preenches o formulário. Simples e rápido." },
      { n:"02", title:"Criamos o teu perfil",    desc:"A equipa ONEDM constrói o perfil do teu espaço na plataforma." },
      { n:"03", title:"Viajantes descobrem-te",  desc:"O teu espaço aparece nos roteiros personalizados de viajantes." },
      { n:"04", title:"Reservas chegam",         desc:"Recebes reservas antecipadas com todas as preferências definidas." },
    ],
    quote:"\"Moçambique tem algumas das praias mais bonitas do mundo. O problema não é o destino — é que o mundo ainda não sabe como chegar. O ONEDM resolve isso.\"",
    formBadge:"PARCEIROS FUNDADORES · 23 VAGAS",
    formTitle:"Junta o teu espaço", formTitleEm:"ao mapa global.",
    formSub:"Preenche o formulário. A equipa ONEDM entra em contacto pessoalmente para criar o teu perfil.",
    fName:"Nome do Espaço", fNamePH:"Ex: Pemba Beach Hotel",
    fCat:"Categoria", fCatPH:"Selecciona uma categoria",
    fLoc:"Localização", fLocPH:"Ex: Pemba, Cabo Delgado",
    fIG:"Instagram", fIGPH:"@nomedobar",
    fEmail:"Email", fEmailPH:"contacto@espaco.co.mz",
    fPhone:"WhatsApp", fPhonePH:"+258 84 000 0000",
    fAbout:"Descreve o teu espaço (opcional)", fAboutPH:"O que torna o teu espaço único? Que tipo de viajantes recebem?",
    fSubmit:"Tornar-me Parceiro Fundador →", fSubmitting:"A processar…",
    fTrust:["✦ Gratuito no lançamento","✦ Sem contrato vinculativo","✦ Suporte dedicado"],
    confirmBadge:"PARCEIRO FUNDADOR CONFIRMADO",
    confirmTitle:"Bem-vindo ao", confirmTitleEm:"ONEDM.",
    confirmSub:"está agora na rede de parceiros fundadores.",
    confirmContact:"Vamos entrar em contacto por",
    confirmContactSub:"nas próximas 24–48 horas.",
    confirmNext:"O que acontece a seguir",
    confirmSteps:[
      { icon:"📋", title:"Pedido recebido",       desc:"O teu formulário foi registado com sucesso.", done:true },
      { icon:"👋", title:"Contacto pessoal",       desc:"A equipa ONEDM entra em contacto por email em 24–48h.", done:false },
      { icon:"🎨", title:"Criação do perfil",      desc:"Construímos o teu perfil na plataforma com fotos e descrição.", done:false },
      { icon:"🌍", title:"Visível para o mundo",   desc:"O teu espaço começa a aparecer nos roteiros de viajantes.", done:false },
    ],
    confirmDone:"Feito ✓",
    shareTitle:"Partilha com outros espaços",
    shareSub:"Conheces outros hotéis, restaurantes ou experiências em Moçambique? Partilha o link de parceiros com eles.",
    shareCopy:"Copiar link de parceiros",
    confirmBack:"← Explorar a plataforma",
    footerPartners:"Parceiros", footerPrivacy:"Privacidade", footerTerms:"Termos",
    alreadyPartner:"Já és parceiro?", partnerLogin:"Entrar",
    scroll:"Scroll",
    categories:["Hotel / Lodge","Restaurante","Bar / Beach Bar","Experiência / Tour","Spa / Wellness","Outro"],
  },
  EN: {
    tagline:"One Destination Manager",
    heroTitle:"The entire world,",
    heroTitleEm:"managed by you.",
    heroSub:"Plan meals with your macros, build itineraries, make reservations and discover cultures — before leaving home.",
    waitlistPlaceholder:"your@email.com",
    waitlistBtn:"Join →",
    waitlistSub:"312 people on the list · Free early access · No spam",
    waitlistDone:"You're in.",
    waitlistDoneSub:"You'll be among the first to explore ONEDM.",
    navProduct:"Product", navDestinos:"Destinations", navPartners:"For Partners",
    statsCountries:"Countries", statsInstances:"Venues", statsPersonalized:"Personalised", statsPlatform:"Platform",
    destTitle:"Explore Destinations",
    destSubtitle:"From Tokyo to Maputo,", destSubtitleEm:"all connected.",
    destMore:"of 180+ countries →",
    demoLabel:"Interactive Demo",
    demoTitle:"Try",
    tabItinerary:"🗺️ Itinerary", tabMeal:"🍽️ Meal",
    culturalLabel:"Future Vision",
    culturalTitle:"Cultures that", culturalTitleEm:"meet.",
    culturalSub:"Tourist venues worldwide share their identity. Before you arrive, you already know the place.",
    howTitle:"Four steps,", howTitleEm:"complete journey.",
    steps:[
      { n:"01", icon:"🔍", title:"Discover",    desc:"Search any destination and explore curated venues." },
      { n:"02", icon:"📍", title:"Plan",        desc:"Build your visual itinerary with integrated bookings." },
      { n:"03", icon:"⚖️", title:"Personalise", desc:"Set your macros for every meal of the trip." },
      { n:"04", icon:"✈️", title:"Travel",      desc:"Arrive and live it. Everything is ready." },
    ],
    ctaLabel:"Your next chapter",
    ctaTitle:"The destination starts", ctaTitleEm:"here.",
    ctaSub:"Early users shape the product and get free lifetime access.",
    ctaPartnerBtn:"Own a venue? → Become a partner",
    mealConfig:"Configure meal", mealResult:"Your meal",
    mealDestLabel:"Destination", mealProtLabel:"Protein", mealCarbLabel:"Carbohydrate",
    mealGenerateBtn:"✦  Generate Local Dish", mealGenerating:"Generating…",
    mealLoading:"Consulting chefs in",
    mealEmpty:"Set your macros and generate an authentic dish from",
    mealWhere:"📍 Where to find it", mealTech:"🔪 Technique", mealDid:"💡 Did you know",
    itiHeader:"Tokyo · Full Day", itiSub:"6 stops · 09:00–21:30 · All booked",
    itiMap:"View on map", itiReserve:"Book", itiMacros:"Customise macros", itiDetails:"Details",
    partnersProgram:"ONEDM · Partner Programme",
    partnersUrgency:"Only", partnersVagas:"founding partner spots available",
    partnersHeroTitle:"Your venue,", partnersHeroTitle2:"seen by the", partnersHeroTitleEm:"entire world.",
    partnersHeroSub:"ONEDM brings Mozambique's tourist venues to international travellers who plan everything before leaving home.",
    partnersJoin:"Become a partner →",
    partnersSeeApp:"← See the platform",
    partnersTravellers:"Travellers on list", partnersCountries:"Countries of origin", partnersFree:"At launch", partnersSlots:"Spots remaining",
    benefitsLabel:"What you gain",
    benefitsTitle:"More than visibility.", benefitsTitleEm:"Real business.",
    benefits:[
      { icon:"📅", title:"Guaranteed advance bookings",     desc:"Travellers arrive with reservations made weeks ahead. Zero last-minute cancellations.", stat:"+40%",  statLabel:"predictable revenue" },
      { icon:"🍽️", title:"Meal orders ready in advance",    desc:"Each guest sends their macros beforehand. The kitchen prepares exactly what was requested.", stat:"0", statLabel:"food waste" },
      { icon:"🌍", title:"Exposure to international guests", desc:"Your venue appears in itineraries of travellers worldwide before they depart.", stat:"180+", statLabel:"countries of origin" },
      { icon:"✦",  title:"Cultural profile on the global map",desc:"Share your venue's identity and story. Guests who already know you arrive at your door.", stat:"100%", statLabel:"qualified visitors" },
    ],
    howPartnerLabel:"How it works",
    howPartnerTitle:"From application to your first", howPartnerTitleEm:"international booking.",
    partnerSteps:[
      { n:"01", title:"Submit your request",   desc:"Fill in the form. Simple and fast." },
      { n:"02", title:"We build your profile", desc:"The ONEDM team creates your venue's profile on the platform." },
      { n:"03", title:"Travellers discover you",desc:"Your space appears in personalised traveller itineraries." },
      { n:"04", title:"Bookings arrive",       desc:"Receive advance bookings with all guest preferences already set." },
    ],
    quote:"\"Mozambique has some of the most beautiful beaches in the world. The problem isn't the destination — it's that the world doesn't yet know how to get there. ONEDM solves that.\"",
    formBadge:"FOUNDING PARTNERS · 23 SPOTS",
    formTitle:"Add your venue", formTitleEm:"to the global map.",
    formSub:"Fill in the form. The ONEDM team will reach out personally to build your profile.",
    fName:"Venue Name", fNamePH:"E.g. Pemba Beach Hotel",
    fCat:"Category", fCatPH:"Select a category",
    fLoc:"Location", fLocPH:"E.g. Pemba, Cabo Delgado",
    fIG:"Instagram", fIGPH:"@venuename",
    fEmail:"Email", fEmailPH:"contact@venue.co.mz",
    fPhone:"WhatsApp", fPhonePH:"+258 84 000 0000",
    fAbout:"Describe your venue (optional)", fAboutPH:"What makes your space unique? What kind of travellers do you receive?",
    fSubmit:"Become a Founding Partner →", fSubmitting:"Processing…",
    fTrust:["✦ Free at launch","✦ No binding contract","✦ Dedicated support"],
    confirmBadge:"FOUNDING PARTNER CONFIRMED",
    confirmTitle:"Welcome to", confirmTitleEm:"ONEDM.",
    confirmSub:"is now part of the ONEDM founding partner network.",
    confirmContact:"We'll reach out at",
    confirmContactSub:"within the next 24–48 hours.",
    confirmNext:"What happens next",
    confirmSteps:[
      { icon:"📋", title:"Request received",      desc:"Your form has been successfully registered.", done:true },
      { icon:"👋", title:"Personal outreach",     desc:"The ONEDM team will contact you by email within 24–48h.", done:false },
      { icon:"🎨", title:"Profile creation",      desc:"We build your platform profile with photos and description.", done:false },
      { icon:"🌍", title:"Visible to the world",  desc:"Your venue starts appearing in traveller itineraries.", done:false },
    ],
    confirmDone:"Done ✓",
    shareTitle:"Share with other venues",
    shareSub:"Know other hotels, restaurants or experiences in Mozambique? Share the partner link with them.",
    shareCopy:"Copy partner link",
    confirmBack:"← Explore the platform",
    footerPartners:"Partners", footerPrivacy:"Privacy", footerTerms:"Terms",
    alreadyPartner:"Already a partner?", partnerLogin:"Sign in",
    scroll:"Scroll",
    categories:["Hotel / Lodge","Restaurant","Bar / Beach Bar","Experience / Tour","Spa / Wellness","Other"],
  },
  FR: {
    tagline:"One Destination Manager",
    heroTitle:"Le monde entier,",
    heroTitleEm:"géré par toi.",
    heroSub:"Planifie tes repas selon tes macros, crée des itinéraires, fais des réservations et découvre des cultures — avant de partir.",
    waitlistPlaceholder:"ton@email.com",
    waitlistBtn:"Rejoindre →",
    waitlistSub:"312 personnes sur la liste · Accès early gratuit · Sans spam",
    waitlistDone:"Tu es dedans.",
    waitlistDoneSub:"Tu seras parmi les premiers à explorer ONEDM.",
    navProduct:"Produit", navDestinos:"Destinations", navPartners:"Pour Partenaires",
    statsCountries:"Pays", statsInstances:"Lieux", statsPersonalized:"Personnalisé", statsPlatform:"Plateforme",
    destTitle:"Explorer les Destinations",
    destSubtitle:"De Tokyo à Maputo,", destSubtitleEm:"tout connecté.",
    destMore:"de 180+ pays →",
    demoLabel:"Démo Interactive",
    demoTitle:"Essaie",
    tabItinerary:"🗺️ Itinéraire", tabMeal:"🍽️ Repas",
    culturalLabel:"Vision Future",
    culturalTitle:"Des cultures qui se", culturalTitleEm:"rencontrent.",
    culturalSub:"Les lieux touristiques du monde entier partagent leur identité. Avant d'arriver, tu connais déjà l'endroit.",
    howTitle:"Quatre étapes,", howTitleEm:"voyage complet.",
    steps:[
      { n:"01", icon:"🔍", title:"Découvre",     desc:"Recherche n'importe quelle destination et explore des lieux curatés." },
      { n:"02", icon:"📍", title:"Planifie",     desc:"Crée ton itinéraire visuel avec des réservations intégrées." },
      { n:"03", icon:"⚖️", title:"Personnalise", desc:"Définis tes macros pour chaque repas du voyage." },
      { n:"04", icon:"✈️", title:"Voyage",       desc:"Arrive et vis. Tout est prêt." },
    ],
    ctaLabel:"Ton prochain chapitre",
    ctaTitle:"La destination commence", ctaTitleEm:"ici.",
    ctaSub:"Les premiers utilisateurs façonnent le produit et obtiennent un accès gratuit à vie.",
    ctaPartnerBtn:"Tu as un lieu touristique ? → Deviens partenaire",
    mealConfig:"Configurer le repas", mealResult:"Ton repas",
    mealDestLabel:"Destination", mealProtLabel:"Protéine", mealCarbLabel:"Glucide",
    mealGenerateBtn:"✦  Générer un Plat Local", mealGenerating:"En cours…",
    mealLoading:"Consultation des chefs à",
    mealEmpty:"Configure tes macros et génère un plat authentique de",
    mealWhere:"📍 Où le trouver", mealTech:"🔪 Technique", mealDid:"💡 Le saviez-vous",
    itiHeader:"Tokyo · Journée Complète", itiSub:"6 étapes · 09h00–21h30 · Tout réservé",
    itiMap:"Voir sur la carte", itiReserve:"Réserver", itiMacros:"Personnaliser macros", itiDetails:"Détails",
    partnersProgram:"ONEDM · Programme Partenaires",
    partnersUrgency:"Seulement", partnersVagas:"places partenaire fondateur disponibles",
    partnersHeroTitle:"Ton lieu,", partnersHeroTitle2:"vu par le", partnersHeroTitleEm:"monde entier.",
    partnersHeroSub:"ONEDM amène les lieux touristiques du Mozambique aux voyageurs internationaux qui planifient tout avant de partir.",
    partnersJoin:"Devenir partenaire →",
    partnersSeeApp:"← Voir la plateforme",
    partnersTravellers:"Voyageurs sur la liste", partnersCountries:"Pays d'origine", partnersFree:"Au lancement", partnersSlots:"Places restantes",
    benefitsLabel:"Ce que tu gagnes",
    benefitsTitle:"Plus que de la visibilité.", benefitsTitleEm:"Un vrai business.",
    benefits:[
      { icon:"📅", title:"Réservations anticipées garanties",  desc:"Les voyageurs arrivent avec des réservations faites des semaines à l'avance. Zéro annulation surprise.", stat:"+40%",  statLabel:"revenus prévisibles" },
      { icon:"🍽️", title:"Commandes alimentaires déjà prêtes", desc:"Chaque client envoie ses macros à l'avance. La cuisine prépare exactement ce qui a été demandé.", stat:"0", statLabel:"gaspillage alimentaire" },
      { icon:"🌍", title:"Exposition aux voyageurs internationaux",desc:"Ton lieu apparaît dans les itinéraires de voyageurs du monde entier avant leur départ.", stat:"180+", statLabel:"pays d'origine" },
      { icon:"✦",  title:"Profil culturel sur la carte mondiale", desc:"Partage l'identité et l'histoire de ton lieu. Arrivent ceux qui te connaissent déjà.", stat:"100%", statLabel:"visiteurs qualifiés" },
    ],
    howPartnerLabel:"Comment ça marche",
    howPartnerTitle:"De la demande à ta première", howPartnerTitleEm:"réservation internationale.",
    partnerSteps:[
      { n:"01", title:"Soumettre la demande",    desc:"Remplis le formulaire. Simple et rapide." },
      { n:"02", title:"Création du profil",      desc:"L'équipe ONEDM crée le profil de ton lieu sur la plateforme." },
      { n:"03", title:"Les voyageurs te trouvent",desc:"Ton lieu apparaît dans les itinéraires personnalisés." },
      { n:"04", title:"Les réservations arrivent",desc:"Reçois des réservations anticipées avec toutes les préférences définies." },
    ],
    quote:"\"Le Mozambique possède certaines des plus belles plages du monde. Le problème n'est pas la destination — c'est que le monde ne sait pas encore comment y aller. ONEDM résout ça.\"",
    formBadge:"PARTENAIRES FONDATEURS · 23 PLACES",
    formTitle:"Ajoute ton lieu", formTitleEm:"à la carte mondiale.",
    formSub:"Remplis le formulaire. L'équipe ONEDM te contactera personnellement pour créer ton profil.",
    fName:"Nom du Lieu", fNamePH:"Ex: Pemba Beach Hotel",
    fCat:"Catégorie", fCatPH:"Sélectionne une catégorie",
    fLoc:"Localisation", fLocPH:"Ex: Pemba, Cabo Delgado",
    fIG:"Instagram", fIGPH:"@nomdulieu",
    fEmail:"Email", fEmailPH:"contact@lieu.co.mz",
    fPhone:"WhatsApp", fPhonePH:"+258 84 000 0000",
    fAbout:"Décris ton lieu (optionnel)", fAboutPH:"Qu'est-ce qui rend ton lieu unique ? Quels voyageurs reçois-tu ?",
    fSubmit:"Devenir Partenaire Fondateur →", fSubmitting:"En cours…",
    fTrust:["✦ Gratuit au lancement","✦ Sans contrat contraignant","✦ Support dédié"],
    confirmBadge:"PARTENAIRE FONDATEUR CONFIRMÉ",
    confirmTitle:"Bienvenue sur", confirmTitleEm:"ONEDM.",
    confirmSub:"fait maintenant partie du réseau de partenaires fondateurs ONEDM.",
    confirmContact:"Nous te contacterons à",
    confirmContactSub:"dans les prochaines 24–48 heures.",
    confirmNext:"Ce qui se passe ensuite",
    confirmSteps:[
      { icon:"📋", title:"Demande reçue",        desc:"Ton formulaire a été enregistré avec succès.", done:true },
      { icon:"👋", title:"Contact personnel",    desc:"L'équipe ONEDM te contactera par email dans 24–48h.", done:false },
      { icon:"🎨", title:"Création du profil",   desc:"Nous créons ton profil avec photos et description.", done:false },
      { icon:"🌍", title:"Visible dans le monde",desc:"Ton lieu commence à apparaître dans les itinéraires.", done:false },
    ],
    confirmDone:"Fait ✓",
    shareTitle:"Partage avec d'autres lieux",
    shareSub:"Tu connais d'autres hôtels, restaurants ou expériences au Mozambique ? Partage le lien partenaire avec eux.",
    shareCopy:"Copier le lien partenaire",
    confirmBack:"← Explorer la plateforme",
    footerPartners:"Partenaires", footerPrivacy:"Confidentialité", footerTerms:"Conditions",
    alreadyPartner:"Déjà partenaire ?", partnerLogin:"Connexion",
    scroll:"Défiler",
    categories:["Hôtel / Lodge","Restaurant","Bar / Beach Bar","Expérience / Tour","Spa / Wellness","Autre"],
  },
  ES: {
    tagline:"One Destination Manager",
    heroTitle:"El mundo entero,",
    heroTitleEm:"gestionado por ti.",
    heroSub:"Planifica comidas con tus macros, crea itinerarios, haz reservas y descubre culturas — antes de salir de casa.",
    waitlistPlaceholder:"tu@email.com",
    waitlistBtn:"Unirse →",
    waitlistSub:"312 personas en la lista · Acceso early gratuito · Sin spam",
    waitlistDone:"Estás dentro.",
    waitlistDoneSub:"Serás de los primeros en explorar ONEDM.",
    navProduct:"Producto", navDestinos:"Destinos", navPartners:"Para Socios",
    statsCountries:"Países", statsInstances:"Lugares", statsPersonalized:"Personalizado", statsPlatform:"Plataforma",
    destTitle:"Explorar Destinos",
    destSubtitle:"De Tokio a Maputo,", destSubtitleEm:"todo conectado.",
    destMore:"de 180+ países →",
    demoLabel:"Demo Interactivo",
    demoTitle:"Prueba",
    tabItinerary:"🗺️ Itinerario", tabMeal:"🍽️ Comida",
    culturalLabel:"Visión Futura",
    culturalTitle:"Culturas que se", culturalTitleEm:"encuentran.",
    culturalSub:"Lugares turísticos de todo el mundo comparten su identidad. Antes de llegar, ya conoces el lugar.",
    howTitle:"Cuatro pasos,", howTitleEm:"viaje completo.",
    steps:[
      { n:"01", icon:"🔍", title:"Descubre",    desc:"Busca cualquier destino y explora lugares curados." },
      { n:"02", icon:"📍", title:"Planifica",   desc:"Crea tu itinerario visual con reservas integradas." },
      { n:"03", icon:"⚖️", title:"Personaliza", desc:"Define tus macros para cada comida del viaje." },
      { n:"04", icon:"✈️", title:"Viaja",       desc:"Llega y vívelo. Todo está listo." },
    ],
    ctaLabel:"Tu próximo capítulo",
    ctaTitle:"El destino empieza", ctaTitleEm:"aquí.",
    ctaSub:"Los primeros usuarios moldean el producto y obtienen acceso gratuito de por vida.",
    ctaPartnerBtn:"¿Tienes un espacio turístico? → Conviértete en socio",
    mealConfig:"Configurar comida", mealResult:"Tu comida",
    mealDestLabel:"Destino", mealProtLabel:"Proteína", mealCarbLabel:"Hidrato de Carbono",
    mealGenerateBtn:"✦  Generar Plato Local", mealGenerating:"Generando…",
    mealLoading:"Consultando chefs en",
    mealEmpty:"Configura tus macros y genera un plato auténtico de",
    mealWhere:"📍 Dónde encontrarlo", mealTech:"🔪 Técnica", mealDid:"💡 ¿Sabías que",
    itiHeader:"Tokio · Día Completo", itiSub:"6 paradas · 09:00–21:30 · Todo reservado",
    itiMap:"Ver en el mapa", itiReserve:"Reservar", itiMacros:"Personalizar macros", itiDetails:"Detalles",
    partnersProgram:"ONEDM · Programa de Socios",
    partnersUrgency:"Solo", partnersVagas:"plazas de socio fundador disponibles",
    partnersHeroTitle:"Tu espacio,", partnersHeroTitle2:"visto por el", partnersHeroTitleEm:"mundo entero.",
    partnersHeroSub:"ONEDM lleva los espacios turísticos de Mozambique a viajeros internacionales que planifican todo antes de salir de casa.",
    partnersJoin:"Quiero ser socio →",
    partnersSeeApp:"← Ver la plataforma",
    partnersTravellers:"Viajeros en la lista", partnersCountries:"Países de origen", partnersFree:"En el lanzamiento", partnersSlots:"Plazas restantes",
    benefitsLabel:"Qué ganas",
    benefitsTitle:"Más que visibilidad.", benefitsTitleEm:"Negocio real.",
    benefits:[
      { icon:"📅", title:"Reservas anticipadas garantizadas",   desc:"Los viajeros llegan con reservas hechas semanas antes. Cero cancelaciones sorpresa.", stat:"+40%",  statLabel:"ingresos previsibles" },
      { icon:"🍽️", title:"Pedidos de comida ya listos",         desc:"Cada cliente envía sus macros con anticipación. La cocina prepara exactamente lo pedido.", stat:"0", statLabel:"desperdicio alimentario" },
      { icon:"🌍", title:"Exposición a viajeros internacionales",desc:"Tu espacio aparece en itinerarios de viajeros de todo el mundo antes de que partan.", stat:"180+", statLabel:"países de origen" },
      { icon:"✦",  title:"Perfil cultural en el mapa global",   desc:"Comparte la identidad e historia de tu espacio. Llegan quienes ya te conocen.", stat:"100%", statLabel:"visitantes cualificados" },
    ],
    howPartnerLabel:"Cómo funciona",
    howPartnerTitle:"De la solicitud a tu primera", howPartnerTitleEm:"reserva internacional.",
    partnerSteps:[
      { n:"01", title:"Envías la solicitud",       desc:"Rellenas el formulario. Simple y rápido." },
      { n:"02", title:"Creamos tu perfil",         desc:"El equipo ONEDM construye el perfil de tu espacio en la plataforma." },
      { n:"03", title:"Los viajeros te descubren", desc:"Tu espacio aparece en itinerarios personalizados de viajeros." },
      { n:"04", title:"Llegan las reservas",       desc:"Recibes reservas anticipadas con todas las preferencias ya definidas." },
    ],
    quote:"\"Mozambique tiene algunas de las playas más hermosas del mundo. El problema no es el destino — es que el mundo aún no sabe cómo llegar. ONEDM lo resuelve.\"",
    formBadge:"SOCIOS FUNDADORES · 23 PLAZAS",
    formTitle:"Añade tu espacio", formTitleEm:"al mapa global.",
    formSub:"Rellena el formulario. El equipo ONEDM se pondrá en contacto personalmente para crear tu perfil.",
    fName:"Nombre del Espacio", fNamePH:"Ej: Pemba Beach Hotel",
    fCat:"Categoría", fCatPH:"Selecciona una categoría",
    fLoc:"Ubicación", fLocPH:"Ej: Pemba, Cabo Delgado",
    fIG:"Instagram", fIGPH:"@nombredellugar",
    fEmail:"Email", fEmailPH:"contacto@espacio.co.mz",
    fPhone:"WhatsApp", fPhonePH:"+258 84 000 0000",
    fAbout:"Describe tu espacio (opcional)", fAboutPH:"¿Qué hace único tu espacio? ¿Qué tipo de viajeros recibes?",
    fSubmit:"Convertirme en Socio Fundador →", fSubmitting:"Procesando…",
    fTrust:["✦ Gratuito en el lanzamiento","✦ Sin contrato vinculante","✦ Soporte dedicado"],
    confirmBadge:"SOCIO FUNDADOR CONFIRMADO",
    confirmTitle:"Bienvenido a", confirmTitleEm:"ONEDM.",
    confirmSub:"ya forma parte de la red de socios fundadores de ONEDM.",
    confirmContact:"Nos pondremos en contacto por",
    confirmContactSub:"en las próximas 24–48 horas.",
    confirmNext:"Qué ocurre después",
    confirmSteps:[
      { icon:"📋", title:"Solicitud recibida",       desc:"Tu formulario ha sido registrado con éxito.", done:true },
      { icon:"👋", title:"Contacto personal",        desc:"El equipo ONEDM se pondrá en contacto por email en 24–48h.", done:false },
      { icon:"🎨", title:"Creación del perfil",      desc:"Construimos tu perfil con fotos y descripción.", done:false },
      { icon:"🌍", title:"Visible para el mundo",    desc:"Tu espacio empieza a aparecer en itinerarios de viajeros.", done:false },
    ],
    confirmDone:"Hecho ✓",
    shareTitle:"Comparte con otros espacios",
    shareSub:"¿Conoces otros hoteles, restaurantes o experiencias en Mozambique? Comparte el enlace de socios con ellos.",
    shareCopy:"Copiar enlace de socios",
    confirmBack:"← Explorar la plataforma",
    footerPartners:"Socios", footerPrivacy:"Privacidad", footerTerms:"Términos",
    alreadyPartner:"¿Ya eres socio?", partnerLogin:"Entrar",
    scroll:"Scroll",
    categories:["Hotel / Lodge","Restaurante","Bar / Beach Bar","Experiencia / Tour","Spa / Wellness","Otro"],
  },
};

/* ─── LANGUAGE CONTEXT ───────────────────────────────────────────────────── */
const LangCtx = createContext({ lang:"PT", t:T.PT, setLang:()=>{} });
const useLang = () => useContext(LangCtx);

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const DESTINATIONS = [
  { city:"Tóquio",  country:"Japão",      flag:"🇯🇵", code:"TYO", temp:"18°C", color:H.primary },
  { city:"Nairobi", country:"Quénia",     flag:"🇰🇪", code:"NBO", temp:"24°C", color:H.mint },
  { city:"Paris",   country:"França",     flag:"🇫🇷", code:"CDG", temp:"14°C", color:H.coral },
  { city:"Dubai",   country:"EAU",        flag:"🇦🇪", code:"DXB", temp:"35°C", color:H.amber },
  { city:"Rio",     country:"Brasil",     flag:"🇧🇷", code:"GIG", temp:"29°C", color:"#E84393" },
  { city:"Maputo",  country:"Moçambique", flag:"🇲🇿", code:"MPM", temp:"28°C", color:"#00A8CC" },
];
const DEST_TAGS = {
  PT:{ TYO:["Gastronomia","Tradição","Tecnologia"], NBO:["Safari","Cultura","Natureza"], CDG:["Arte","Moda","Culinária"], DXB:["Luxo","Arquitectura","Deserto"], GIG:["Praia","Carnaval","Floresta"], MPM:["Oceano","Afro","Machamba"] },
  EN:{ TYO:["Gastronomy","Tradition","Technology"], NBO:["Safari","Culture","Nature"],   CDG:["Art","Fashion","Cuisine"],   DXB:["Luxury","Architecture","Desert"], GIG:["Beach","Carnival","Forest"],  MPM:["Ocean","Afro","Machamba"] },
  FR:{ TYO:["Gastronomie","Tradition","Technologie"], NBO:["Safari","Culture","Nature"], CDG:["Art","Mode","Cuisine"],      DXB:["Luxe","Architecture","Désert"],   GIG:["Plage","Carnaval","Forêt"],   MPM:["Océan","Afro","Machamba"] },
  ES:{ TYO:["Gastronomía","Tradición","Tecnología"], NBO:["Safari","Cultura","Naturaleza"], CDG:["Arte","Moda","Cocina"],  DXB:["Lujo","Arquitectura","Desierto"], GIG:["Playa","Carnaval","Bosque"],  MPM:["Océano","Afro","Machamba"] },
};
const PROTEINS = ["Frango","Salmão","Bife","Tofu","Camarão","Ovo"];
const CARBS    = ["Arroz","Massa","Quinoa","Batata-doce","Aveia","Mandioca"];
const STOPS = [
  { time:"09:00", place:"Senso-ji Temple",  type:"Cultura",     icon:"⛩️", dur:"90min" },
  { time:"11:00", place:"Tsukiji Market",   type:"Gastronomia", icon:"🐟", dur:"60min" },
  { time:"13:00", place:"Ichiran Ramen",    type:"Refeição",    icon:"🍜", dur:"45min" },
  { time:"15:00", place:"Shibuya Crossing", type:"Iconic",      icon:"🚶", dur:"30min" },
  { time:"17:00", place:"TeamLab Planets",  type:"Arte",        icon:"✨", dur:"120min" },
  { time:"20:00", place:"Yakitori Alley",   type:"Refeição",    icon:"🍢", dur:"90min" },
];
const TYPE_COLOR = { Cultura:H.primary, Gastronomia:H.mint, Refeição:H.coral, Iconic:H.amber, Arte:"#E84393" };

/* ─── HOOKS ──────────────────────────────────────────────────────────────── */
function useVisible(ref, th=0.12) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setV(true); },{ threshold:th });
    if(ref.current) o.observe(ref.current);
    return ()=>o.disconnect();
  },[]);
  return v;
}

/* ─── SHARED UI ──────────────────────────────────────────────────────────── */
function Sec({ children, style }) {
  const ref=useRef(); const v=useVisible(ref);
  return <section ref={ref} style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(28px)", transition:"opacity .7s ease,transform .7s ease", ...style }}>{children}</section>;
}

function Ring({ value, max, color, label }) {
  const r=26,c=2*Math.PI*r,p=Math.min(value/max,1);
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:5 }}>
      <svg width={68} height={68} viewBox="0 0 68 68">
        <circle cx={34} cy={34} r={r} fill="none" stroke={`${color}20`} strokeWidth={5}/>
        <circle cx={34} cy={34} r={r} fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={`${p*c} ${c}`} strokeDashoffset={c/4} strokeLinecap="round"
          style={{ transition:"stroke-dasharray .6s cubic-bezier(.4,0,.2,1)" }}/>
        <text x={34} y={38} textAnchor="middle" fill={color} fontSize={10} fontFamily="'DM Mono',monospace">{value}g</text>
      </svg>
      <span style={{ fontSize:9,color:H.textMuted,letterSpacing:1.5,textTransform:"uppercase" }}>{label}</span>
    </div>
  );
}

function RangeSlider({ value, min, max, color, onChange }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:10 }}>
      <input type="range" min={min} max={max} value={value} onChange={e=>onChange(+e.target.value)} style={{ flex:1,accentColor:color,height:3 }}/>
      <span style={{ fontFamily:"'DM Mono',monospace",fontSize:11,color,minWidth:38,textAlign:"right" }}>{value}g</span>
    </div>
  );
}

function FInput({ label, placeholder, type="text", value, onChange, required }) {
  const [f,setF]=useState(false);
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
      <label style={{ fontSize:11,letterSpacing:1.5,color:H.textSub,textTransform:"uppercase",fontFamily:"'DM Mono',monospace" }}>
        {label}{required&&<span style={{ color:H.coral,marginLeft:3 }}>*</span>}
      </label>
      <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)}
        onFocus={()=>setF(true)} onBlur={()=>setF(false)}
        style={{ background:H.bgAlt,border:`1px solid ${f?H.primary:H.border}`,borderRadius:12,padding:"13px 16px",fontSize:14,color:H.text,outline:"none",transition:"border-color .2s",fontFamily:"'Outfit',sans-serif",boxShadow:f?`0 0 0 3px rgba(61,47,232,0.08)`:"none" }}/>
    </div>
  );
}

function FSelect({ label, options, value, onChange, required }) {
  const [f,setF]=useState(false);
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
      <label style={{ fontSize:11,letterSpacing:1.5,color:H.textSub,textTransform:"uppercase",fontFamily:"'DM Mono',monospace" }}>
        {label}{required&&<span style={{ color:H.coral,marginLeft:3 }}>*</span>}
      </label>
      <div style={{ position:"relative" }}>
        <select value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setF(true)} onBlur={()=>setF(false)}
          style={{ width:"100%",background:H.bgAlt,border:`1px solid ${f?H.primary:H.border}`,borderRadius:12,padding:"13px 16px",fontSize:14,color:value?H.text:H.textMuted,outline:"none",appearance:"none",fontFamily:"'Outfit',sans-serif",boxShadow:f?`0 0 0 3px rgba(61,47,232,0.08)`:"none",transition:"border-color .2s" }}>
          <option value="" disabled>{options[0]}</option>
          {options.slice(1).map(o=><option key={o} value={o} style={{ background:"#fff",color:H.text }}>{o}</option>)}
        </select>
        <span style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",color:H.textMuted,pointerEvents:"none",fontSize:11 }}>▼</span>
      </div>
    </div>
  );
}

function FTextarea({ label, placeholder, value, onChange }) {
  const [f,setF]=useState(false);
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
      <label style={{ fontSize:11,letterSpacing:1.5,color:H.textSub,textTransform:"uppercase",fontFamily:"'DM Mono',monospace" }}>{label}</label>
      <textarea placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)}
        onFocus={()=>setF(true)} onBlur={()=>setF(false)} rows={3}
        style={{ background:H.bgAlt,border:`1px solid ${f?H.primary:H.border}`,borderRadius:12,padding:"13px 16px",fontSize:14,color:H.text,outline:"none",resize:"vertical",fontFamily:"'Outfit',sans-serif",boxShadow:f?`0 0 0 3px rgba(61,47,232,0.08)`:"none",transition:"border-color .2s" }}/>
    </div>
  );
}

function Waitlist({ dark }) {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submit = async () => {
    if (!email.includes("@")) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("https://formspree.io/f/xaqkglpl", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, source: "ONEDM Waitlist" }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  if (done) return (
    <div style={{ textAlign:"center", animation:"riseIn .5s ease" }}>
      <div style={{ width:48, height:48, borderRadius:"50%", background:`linear-gradient(135deg,${H.primary},${H.purple})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, margin:"0 auto 12px", color:"#fff" }}>✦</div>
      <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:20, color:dark?"#fff":H.text, marginBottom:6 }}>{t.waitlistDone}</h3>
      <p style={{ color:dark?"rgba(255,255,255,0.45)":H.textSub, fontSize:13 }}>{t.waitlistDoneSub}</p>
    </div>
  );

  return (
    <div style={{ maxWidth:480, margin:"0 auto" }}>
      <div style={{ display:"flex", gap:10 }}>
        <input
          type="email"
          placeholder={t.waitlistPlaceholder}
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          style={{ flex:1, background:dark?"rgba(255,255,255,0.08)":H.bgAlt, border:`1px solid ${error?"#FF5C3A":dark?"rgba(255,255,255,0.14)":H.border}`, borderRadius:14, padding:"13px 18px", color:dark?"#fff":H.text, fontSize:14, outline:"none", fontFamily:"'Outfit',sans-serif" }}
        />
        <button
          onClick={submit}
          disabled={loading}
          style={{ background:loading?`rgba(61,47,232,0.5)`:`linear-gradient(135deg,${H.primary},${H.purple})`, border:"none", borderRadius:14, padding:"13px 26px", color:"#fff", fontWeight:700, fontSize:12, letterSpacing:.5, cursor:loading?"not-allowed":"pointer", whiteSpace:"nowrap", minWidth:90 }}
        >
          {loading ? "..." : t.waitlistBtn}
        </button>
      </div>
      {error && <p style={{ textAlign:"center", color:"#FF5C3A", fontSize:11, marginTop:8 }}>Algo correu mal. Tenta novamente.</p>}
      <p style={{ textAlign:"center", color:dark?"rgba(255,255,255,0.28)":H.textMuted, fontSize:11, marginTop:10 }}>{t.waitlistSub}</p>
    </div>
  );
}

/* ─── LANGUAGE SWITCHER ──────────────────────────────────────────────────── */
function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(()=>{
    const h = e => { if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown",h);
    return ()=>document.removeEventListener("mousedown",h);
  },[]);
  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button onClick={()=>setOpen(o=>!o)} style={{ display:"flex",alignItems:"center",gap:6,background:H.primaryLight,border:`1px solid ${H.primaryBorder}`,borderRadius:20,padding:"6px 14px",cursor:"pointer",fontSize:12,color:H.primary,fontFamily:"'DM Mono',monospace",letterSpacing:.5 }}>
        <span>{LANGS[lang].flag}</span>
        <span>{LANGS[lang].label}</span>
        <span style={{ fontSize:9,opacity:.6 }}>▼</span>
      </button>
      {open && (
        <div style={{ position:"absolute",top:"calc(100% + 8px)",right:0,background:H.bgAlt,border:`1px solid ${H.border}`,borderRadius:14,boxShadow:H.shadowLg,overflow:"hidden",zIndex:300,minWidth:140,animation:"riseIn .2s ease" }}>
          {Object.entries(LANGS).map(([code,l])=>(
            <button key={code} onClick={()=>{ setLang(code); setOpen(false); }}
              style={{ width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 16px",background:lang===code?H.primaryLight:"transparent",border:"none",cursor:"pointer",fontSize:13,color:lang===code?H.primary:H.text,fontFamily:"'Outfit',sans-serif",textAlign:"left" }}>
              <span style={{ fontSize:16 }}>{l.flag}</span>
              <span style={{ fontWeight:lang===code?600:400 }}>{l.name}</span>
              {lang===code && <span style={{ marginLeft:"auto",fontSize:10,color:H.primary }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── NAV ────────────────────────────────────────────────────────────────── */
function Nav({ page, setPage }) {
  const { t } = useLang();
  const isMobile = useIsMobile();
  const [scroll,setScroll]=useState(0);
  const [menuOpen,setMenuOpen]=useState(false);
  useEffect(()=>{ const h=()=>setScroll(window.scrollY); window.addEventListener("scroll",h,{passive:true}); return()=>window.removeEventListener("scroll",h); },[]);
  const go=pg=>{setPage(pg);setMenuOpen(false);window.scrollTo(0,0);};
  return (
    <>
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:200,padding:isMobile?"13px 20px":"13px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",background:(scroll>50||menuOpen)?"rgba(247,244,239,0.97)":"transparent",backdropFilter:(scroll>50||menuOpen)?"blur(20px)":"none",borderBottom:(scroll>50||menuOpen)?`1px solid ${H.border}`:"none",transition:"all .3s ease" }}>
        <button onClick={()=>go("home")} style={{ display:"flex",alignItems:"center",gap:7,background:"none",border:"none",cursor:"pointer",padding:0 }}>
          <div style={{ width:7,height:7,borderRadius:"50%",background:H.primary }}/>
          <span style={{ fontFamily:"'DM Mono',monospace",fontSize:14,letterSpacing:5,color:H.primary }}>ONEDM</span>
        </button>
        {isMobile ? (
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <LangSwitcher/>
            <button onClick={()=>setMenuOpen(o=>!o)} style={{ background:"none",border:"none",cursor:"pointer",padding:4,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:5,width:32,height:32 }}>
              {menuOpen ? <span style={{ fontSize:20,color:H.text }}>✕</span> : [0,1,2].map(k=><div key={k} style={{ width:22,height:2,background:H.text,borderRadius:2 }}/>)}
            </button>
          </div>
        ) : (
          <div style={{ display:"flex",gap:20,fontSize:13,color:H.textSub,alignItems:"center" }}>
            <span style={{ cursor:"pointer" }} onClick={()=>go("home")}>{t.navProduct}</span>
            <span style={{ cursor:"pointer" }} onClick={()=>go("home")}>{t.navDestinos}</span>
            <button onClick={()=>go("partners")} style={{ background:`linear-gradient(135deg,${H.primary},${H.purple})`,border:"none",borderRadius:24,padding:"8px 22px",color:"#fff",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'Outfit',sans-serif" }}>{t.navPartners}</button>
            <LangSwitcher/>
          </div>
        )}
      </nav>
      {isMobile && menuOpen && (
        <div style={{ position:"fixed",top:55,left:0,right:0,zIndex:190,background:"rgba(247,244,239,0.97)",backdropFilter:"blur(20px)",padding:"16px 20px 24px",borderBottom:`1px solid ${H.border}`,animation:"riseIn .2s ease",display:"flex",flexDirection:"column",gap:4 }}>
          {[{label:t.navProduct,pg:"home"},{label:t.navDestinos,pg:"home"}].map(({label,pg})=>(
            <button key={label} onClick={()=>go(pg)} style={{ width:"100%",padding:"14px 16px",background:"none",border:"none",textAlign:"left",fontSize:16,color:H.text,cursor:"pointer",fontFamily:"'Outfit',sans-serif",borderRadius:10 }}>{label}</button>
          ))}
          <button onClick={()=>go("partners")} style={{ width:"100%",padding:"15px",background:`linear-gradient(135deg,${H.primary},${H.purple})`,border:"none",borderRadius:14,color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer",marginTop:8,fontFamily:"'Outfit',sans-serif" }}>{t.navPartners}</button>
        </div>
      )}
    </>
  );
}
/* ─── MEAL PLANNER ───────────────────────────────────────────────────────── */
function MealPlanner() {
  const { t, lang } = useLang();
  const [protein,setProtein]=useState("Salmão"); const [carb,setCarb]=useState("Quinoa");
  const [pG,setPG]=useState(175); const [cG,setCG]=useState(85);
  const fat=22; const [dest,setDest]=useState(DESTINATIONS[0]);
  const [meal,setMeal]=useState(null); const [loading,setLoading]=useState(false);
  const kcal=Math.round(pG*4+cG*4+fat*9);

  const generate=async()=>{
    setLoading(true); setMeal(null);
    try {
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,messages:[{role:"user",content:`Chef specialising in ${dest.country}. Create authentic local dish with ${protein} ${pG}g and ${carb} ${cG}g. Respond ONLY with JSON no markdown: {"nome":"","descricao":"(1 vivid sentence)","restaurante":"(type of venue)","dica":"(1 cultural fact)","tecnica":"(local technique)","emoji":"(2 emojis)"}`}]})});
      const d=await r.json();
      setMeal(JSON.parse(d.content[0].text.replace(/```json|```/g,"").trim()));
    } catch { setMeal({nome:"Erro",descricao:"Tenta novamente.",restaurante:"-",dica:"-",tecnica:"-",emoji:"🍽️"}); }
    setLoading(false);
  };

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:16,maxWidth:860,margin:"0 auto" }}>
      <div style={{ background:H.bgAlt,border:`1px solid ${H.border}`,borderRadius:20,padding:"24px",boxShadow:H.shadow }}>
        <p style={{ fontSize:10,letterSpacing:3,color:H.primary,textTransform:"uppercase",marginBottom:18,fontFamily:"'DM Mono',monospace" }}>{t.mealConfig}</p>
        <div style={{ marginBottom:14 }}>
          <label style={lbl}>{t.mealDestLabel}</label>
          <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
            {DESTINATIONS.slice(0,4).map(d=>(
              <button key={d.code} onClick={()=>setDest(d)} style={{ padding:"5px 11px",borderRadius:20,border:`1px solid ${dest.code===d.code?d.color:H.border}`,background:dest.code===d.code?`${d.color}10`:"transparent",color:dest.code===d.code?d.color:H.textSub,fontSize:11,cursor:"pointer",transition:"all .2s" }}>{d.flag} {d.city}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:14 }}>
          <label style={lbl}>{t.mealProtLabel}</label>
          <div style={{ display:"flex",gap:5,flexWrap:"wrap",marginBottom:8 }}>
            {PROTEINS.map(p=><button key={p} onClick={()=>setProtein(p)} style={{ padding:"4px 10px",borderRadius:14,border:`1px solid ${protein===p?H.primary:H.border}`,background:protein===p?H.primaryLight:"transparent",color:protein===p?H.primary:H.textSub,fontSize:11,cursor:"pointer",transition:"all .2s" }}>{p}</button>)}
          </div>
          <RangeSlider value={pG} min={50} max={300} color={H.primary} onChange={setPG}/>
        </div>
        <div style={{ marginBottom:18 }}>
          <label style={lbl}>{t.mealCarbLabel}</label>
          <div style={{ display:"flex",gap:5,flexWrap:"wrap",marginBottom:8 }}>
            {CARBS.map(c=><button key={c} onClick={()=>setCarb(c)} style={{ padding:"4px 10px",borderRadius:14,border:`1px solid ${carb===c?H.mint:H.border}`,background:carb===c?H.mintLight:"transparent",color:carb===c?H.mint:H.textSub,fontSize:11,cursor:"pointer",transition:"all .2s" }}>{c}</button>)}
          </div>
          <RangeSlider value={cG} min={30} max={200} color={H.mint} onChange={setCG}/>
        </div>
        <div style={{ display:"flex",justifyContent:"space-around",padding:"14px 0",borderTop:`1px solid ${H.border}`,borderBottom:`1px solid ${H.border}`,marginBottom:18 }}>
          <Ring value={pG} max={300} color={H.primary} label={t.mealProtLabel}/>
          <Ring value={cG} max={200} color={H.mint} label={t.mealCarbLabel}/>
          <Ring value={fat} max={80} color={H.coral} label="Fat"/>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5 }}>
            <span style={{ fontFamily:"'DM Mono',monospace",fontSize:22,color:H.text,fontWeight:300 }}>{kcal}</span>
            <span style={{ fontSize:9,color:H.textMuted,letterSpacing:1.5,textTransform:"uppercase" }}>kcal</span>
          </div>
        </div>
        <button onClick={generate} disabled={loading} style={{ width:"100%",padding:"13px",borderRadius:12,background:loading?H.primaryLight:`linear-gradient(135deg,${H.primary},${H.purple})`,border:loading?`1px solid ${H.primaryBorder}`:"none",color:loading?H.primary:"#fff",fontWeight:700,fontSize:12,letterSpacing:1.5,textTransform:"uppercase",cursor:loading?"not-allowed":"pointer",transition:"all .3s",fontFamily:"'DM Mono',monospace" }}>
          {loading?t.mealGenerating:t.mealGenerateBtn}
        </button>
      </div>
      <div style={{ background:H.bgAlt,border:`1px solid ${H.border}`,borderRadius:20,padding:"24px",boxShadow:H.shadow,display:"flex",flexDirection:"column" }}>
        <p style={{ fontSize:10,letterSpacing:3,color:H.mint,textTransform:"uppercase",marginBottom:18,fontFamily:"'DM Mono',monospace" }}>{t.mealResult}</p>
        {!meal&&!loading&&<div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,opacity:.35 }}><span style={{ fontSize:44 }}>🍽️</span><p style={{ color:H.textSub,fontSize:13,textAlign:"center" }}>{t.mealEmpty} {dest.city}</p></div>}
        {loading&&<div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14 }}><span style={{ fontSize:36,animation:"spin 2s linear infinite",display:"inline-block" }}>{dest.flag}</span><div style={{ width:140,height:3,background:H.primaryLight,borderRadius:2,overflow:"hidden" }}><div style={{ height:"100%",background:H.primary,borderRadius:2,animation:"loadBar 1.4s ease-in-out infinite" }}/></div><p style={{ color:H.textMuted,fontSize:12 }}>{t.mealLoading} {dest.city}…</p></div>}
        {meal&&!loading&&(
          <div style={{ animation:"riseIn .5s ease",flex:1 }}>
            <span style={{ fontSize:36 }}>{meal.emoji}</span>
            <span style={{ marginLeft:8,background:`${dest.color}12`,border:`1px solid ${dest.color}30`,borderRadius:20,padding:"3px 12px",fontSize:10,color:dest.color,verticalAlign:"middle" }}>{dest.flag} {dest.city}</span>
            <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,fontWeight:500,margin:"12px 0 8px",color:H.text,lineHeight:1.2 }}>{meal.nome}</h3>
            <p style={{ color:H.textSub,fontSize:13,lineHeight:1.65,marginBottom:18 }}>{meal.descricao}</p>
            {[{icon:t.mealWhere,value:meal.restaurante,color:H.primary},{icon:t.mealTech,value:meal.tecnica,color:H.mint},{icon:t.mealDid,value:meal.dica,color:H.coral}].map((it,i)=>(
              <div key={i} style={{ background:`${it.color}08`,border:`1px solid ${it.color}20`,borderRadius:10,padding:"9px 12px",marginBottom:8 }}>
                <span style={{ fontSize:10,color:it.color,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:2 }}>{it.icon}</span>
                <span style={{ fontSize:12,color:H.textSub }}>{it.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ITINERARY ──────────────────────────────────────────────────────────── */
function Itinerary() {
  const { t } = useLang();
  const [active,setActive]=useState(null); const [shown,setShown]=useState([]);
  useEffect(()=>{ STOPS.forEach((_,i)=>setTimeout(()=>setShown(p=>[...p,i]),i*150)); },[]);
  return (
    <div style={{ maxWidth:680,margin:"0 auto" }}>
      <div style={{ background:H.bgAlt,border:`1px solid ${H.border}`,borderRadius:16,padding:"14px 18px",display:"flex",alignItems:"center",gap:12,marginBottom:20,boxShadow:H.shadow }}>
        <span style={{ fontSize:22 }}>🇯🇵</span>
        <div style={{ flex:1 }}><p style={{ fontSize:13,fontWeight:600,color:H.text }}>{t.itiHeader}</p><p style={{ fontSize:11,color:H.textMuted }}>{t.itiSub}</p></div>
        {["🗺️","📅","🍽️"].map(e=><span key={e} style={{ width:30,height:30,background:H.bg,border:`1px solid ${H.border}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,cursor:"pointer" }}>{e}</span>)}
      </div>
      <div style={{ position:"relative" }}>
        <div style={{ position:"absolute",left:47,top:16,bottom:16,width:1,background:`linear-gradient(to bottom,transparent,${H.primaryBorder} 10%,${H.primaryBorder} 90%,transparent)` }}/>
        {STOPS.map((s,i)=>(
          <div key={i} onClick={()=>setActive(active===i?null:i)} style={{ display:"flex",gap:14,alignItems:"flex-start",marginBottom:8,cursor:"pointer",opacity:shown.includes(i)?1:0,transform:shown.includes(i)?"translateX(0)":"translateX(-12px)",transition:"all .4s ease" }}>
            <div style={{ minWidth:36,textAlign:"right",paddingTop:14 }}><span style={{ fontFamily:"'DM Mono',monospace",fontSize:9,color:H.textMuted }}>{s.time}</span></div>
            <div style={{ width:20,height:20,borderRadius:"50%",background:active===i?TYPE_COLOR[s.type]:H.bgAlt,border:`2px solid ${active===i?TYPE_COLOR[s.type]:H.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,zIndex:1,marginTop:12,flexShrink:0,transition:"all .25s",color:active===i?"#fff":H.textMuted }}>{active===i?"✓":"●"}</div>
            <div style={{ flex:1,background:active===i?`${TYPE_COLOR[s.type]}07`:H.bgAlt,border:`1px solid ${active===i?TYPE_COLOR[s.type]+"30":H.border}`,borderRadius:14,padding:"12px 14px",transition:"all .3s",boxShadow:active===i?`0 4px 16px ${TYPE_COLOR[s.type]}18`:H.shadow }}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}><span style={{ fontSize:16 }}>{s.icon}</span><span style={{ fontSize:13,fontWeight:500,color:H.text }}>{s.place}</span></div>
                <div style={{ display:"flex",gap:6 }}>
                  <span style={{ fontSize:9,padding:"2px 8px",borderRadius:10,background:`${TYPE_COLOR[s.type]}12`,color:TYPE_COLOR[s.type],border:`1px solid ${TYPE_COLOR[s.type]}25` }}>{s.type}</span>
                  <span style={{ fontSize:9,color:H.textMuted,fontFamily:"'DM Mono',monospace" }}>{s.dur}</span>
                </div>
              </div>
              {active===i&&(
                <div style={{ marginTop:10,display:"flex",gap:7,animation:"riseIn .25s ease" }}>
                  {[t.itiMap,s.type==="Refeição"?t.itiMacros:t.itiReserve,t.itiDetails].map((btn,bi)=>(
                    <button key={bi} style={{ padding:"5px 11px",borderRadius:8,border:bi===1?"none":`1px solid ${H.border}`,background:bi===1?`linear-gradient(135deg,${H.primary},${H.purple})`:H.bgAlt,color:bi===1?"#fff":H.textSub,fontSize:10,cursor:"pointer",fontWeight:bi===1?600:400 }}>{btn}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── DEST CARD ──────────────────────────────────────────────────────────── */
function DestCard({ d, i }) {
  const { lang } = useLang();
  const [hov,setHov]=useState(false);
  const tags = DEST_TAGS[lang][d.code] || [];
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ background:hov?`${d.color}06`:H.bgAlt,border:`1px solid ${hov?d.color+"35":H.border}`,borderRadius:18,padding:"20px 18px",cursor:"pointer",transition:"all .3s cubic-bezier(.4,0,.2,1)",transform:hov?"translateY(-4px)":"none",boxShadow:hov?`0 12px 32px ${d.color}15`:H.shadow,animation:`riseIn .5s ease ${i*.08}s both` }}>
      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:12 }}>
        <span style={{ fontSize:30 }}>{d.flag}</span>
        <div style={{ textAlign:"right" }}><span style={{ fontFamily:"'DM Mono',monospace",fontSize:9,color:H.textMuted,display:"block" }}>{d.code}</span><span style={{ fontSize:11,color:H.textSub }}>{d.temp}</span></div>
      </div>
      <h3 style={{ fontSize:17,fontWeight:600,color:hov?d.color:H.text,transition:"color .25s",marginBottom:3 }}>{d.city}</h3>
      <p style={{ fontSize:11,color:H.textMuted,marginBottom:12 }}>{d.country}</p>
      <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
        {tags.map(tg=><span key={tg} style={{ fontSize:9,padding:"2px 8px",borderRadius:10,background:`${d.color}10`,color:d.color,border:`1px solid ${d.color}22` }}>{tg}</span>)}
      </div>
    </div>
  );
}

/* ─── PARTNER FORM ───────────────────────────────────────────────────────── */
function PartnerForm({ onSuccess }) {
  const { t } = useLang();
  const [form,setForm]=useState({name:"",category:"",location:"",instagram:"",email:"",phone:"",about:""});
  const [loading,setLoading]=useState(false);
  const set=k=>v=>setForm(f=>({...f,[k]:v}));
  const valid=form.name&&form.email&&form.category;
  const submit=()=>{ if(!valid) return; setLoading(true); setTimeout(()=>{ setLoading(false); onSuccess(form); },1600); };
  const cats = [t.fCatPH, ...t.categories];

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:18 }}>
      <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
        <FInput label={t.fName} placeholder={t.fNamePH} value={form.name} onChange={set("name")} required/>
        <FSelect label={t.fCat} options={cats} value={form.category} onChange={set("category")} required/>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
        <FInput label={t.fLoc} placeholder={t.fLocPH} value={form.location} onChange={set("location")}/>
        <FInput label={t.fIG} placeholder={t.fIGPH} value={form.instagram} onChange={set("instagram")}/>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
        <FInput label={t.fEmail} placeholder={t.fEmailPH} type="email" value={form.email} onChange={set("email")} required/>
        <FInput label={t.fPhone} placeholder={t.fPhonePH} value={form.phone} onChange={set("phone")}/>
      </div>
      <FTextarea label={t.fAbout} placeholder={t.fAboutPH} value={form.about} onChange={set("about")}/>
      <button onClick={submit} disabled={!valid||loading} style={{ width:"100%",padding:"16px",borderRadius:14,background:valid?`linear-gradient(135deg,${H.primary},${H.purple})`:H.primaryLight,border:valid?"none":`1px solid ${H.primaryBorder}`,color:valid?"#fff":H.textMuted,fontWeight:700,fontSize:14,letterSpacing:.5,cursor:valid?"pointer":"not-allowed",transition:"all .3s",fontFamily:"'Outfit',sans-serif",boxShadow:valid?`0 8px 24px rgba(61,47,232,0.28)`:"none" }}>
        {loading?<span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10 }}><span style={{ width:14,height:14,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 1s linear infinite",display:"inline-block" }}/>{t.fSubmitting}</span>:t.fSubmit}
      </button>
      <p style={{ textAlign:"center",fontSize:11,color:H.textMuted }}>{t.fTrust.join(" · ")}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE HOME
═══════════════════════════════════════════════════════════════════════════ */
function PageHome({ setPage }) {
  const { t } = useLang();
  const [tab,setTab]=useState("itinerary");
  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"110px 20px 80px",position:"relative",overflow:"hidden" }}>
        {[680,500,340].map((s,i)=><div key={i} style={{ position:"absolute",width:s,height:s,borderRadius:"50%",border:`1px solid rgba(61,47,232,${.04+i*.025})`,top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none" }}/>)}
        <div style={{ position:"absolute",width:600,height:400,borderRadius:"50%",background:`radial-gradient(ellipse,rgba(61,47,232,0.07),transparent 65%)`,top:"35%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle,rgba(255,92,58,0.06),transparent 65%)`,bottom:"10%",right:"8%",pointerEvents:"none" }}/>
        {[{ d:DESTINATIONS[0],top:"22%",left:"6%",delay:"0s" },{ d:DESTINATIONS[2],top:"30%",right:"5%",delay:".5s" },{ d:DESTINATIONS[3],bottom:"28%",left:"5%",delay:"1s" },{ d:DESTINATIONS[5],bottom:"24%",right:"7%",delay:"1.4s" }].map(({ d,delay,...pos })=>(
          <div key={d.code} style={{ position:"absolute",...pos,background:"rgba(255,255,255,0.88)",backdropFilter:"blur(14px)",border:`1px solid ${d.color}25`,borderRadius:14,padding:"8px 14px",display:"flex",alignItems:"center",gap:8,animation:`float ${3.4+Math.random()}s ease-in-out infinite`,animationDelay:delay,boxShadow:"0 6px 24px rgba(18,14,40,0.09)" }}>
            <span style={{ fontSize:18 }}>{d.flag}</span>
            <div><p style={{ fontSize:11,color:H.text,fontWeight:600 }}>{d.city}</p><p style={{ fontSize:9,color:H.textMuted,fontFamily:"'DM Mono',monospace" }}>{d.temp}</p></div>
          </div>
        ))}
        <div style={{ animation:"riseIn .8s ease",marginBottom:18 }}><span style={{ fontSize:11,letterSpacing:4,color:H.primary,fontFamily:"'DM Mono',monospace",textTransform:"uppercase" }}>✦ {t.tagline}</span></div>
        <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(40px,10vw,72px)",fontWeight:400,lineHeight:1.02,marginBottom:22,maxWidth:820,animation:"riseIn 1s ease .15s both",color:H.text }}>{t.heroTitle}<br/><em style={{ color:H.primary }}>{t.heroTitleEm}</em></h1>
        <p style={{ fontSize:"clamp(15px,2vw,18px)",color:H.textSub,maxWidth:490,lineHeight:1.75,marginBottom:48,fontWeight:300,animation:"riseIn 1s ease .3s both" }}>{t.heroSub}</p>
        <div style={{ animation:"riseIn 1s ease .45s both",width:"100%",maxWidth:500 }}><Waitlist/></div>
        <div style={{ position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,animation:"pulse 2.5s ease-in-out infinite" }}>
          <span style={{ fontSize:8,letterSpacing:4,color:H.textMuted,textTransform:"uppercase",fontFamily:"'DM Mono',monospace" }}>{t.scroll}</span>
          <div style={{ width:1,height:40,background:`linear-gradient(to bottom,${H.primary},transparent)` }}/>
        </div>
      </section>

      {/* STATS */}
      <Sec style={{ padding:"0 20px 60px" }}>
        <div style={{ maxWidth:820,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",borderRadius:20,overflow:"hidden",boxShadow:H.shadowLg,border:`1px solid ${H.border}` }}>
          {[["180+",t.statsCountries],["2.4k+",t.statsInstances],["100%",t.statsPersonalized],["1",t.statsPlatform]].map(([n,l],i)=>(
            <div key={i} style={{ padding:"28px 20px",textAlign:"center",background:H.bgAlt,borderRight:i<3?`1px solid ${H.border}`:"none" }}>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:30,color:H.primary,marginBottom:4 }}>{n}</div>
              <div style={{ fontSize:10,color:H.textMuted,letterSpacing:2,textTransform:"uppercase",fontFamily:"'DM Mono',monospace" }}>{l}</div>
            </div>
          ))}
        </div>
      </Sec>

      {/* DESTINATIONS */}
      <Sec style={{ padding:"40px 20px 60px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:44,flexWrap:"wrap",gap:16 }}>
            <div>
              <p style={{ fontSize:10,letterSpacing:3,color:H.primary,fontFamily:"'DM Mono',monospace",textTransform:"uppercase",marginBottom:10 }}>{t.destTitle}</p>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(28px,4.5vw,46px)",fontWeight:400,lineHeight:1.15,color:H.text }}>{t.destSubtitle}<br/><em style={{ color:H.coral }}>{t.destSubtitleEm}</em></h2>
            </div>
            <span style={{ color:H.textMuted,fontSize:12 }}>6 {t.destMore}</span>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))",gap:12 }}>
            {DESTINATIONS.map((d,i)=><DestCard key={d.code} d={d} i={i}/>)}
          </div>
        </div>
      </Sec>

      {/* DEMO */}
      <Sec style={{ padding:"40px 20px",background:H.bgAlt,borderTop:`1px solid ${H.border}`,borderBottom:`1px solid ${H.border}` }}>
        <div style={{ maxWidth:1000,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:44 }}>
            <p style={{ fontSize:10,letterSpacing:3,color:H.primary,fontFamily:"'DM Mono',monospace",textTransform:"uppercase",marginBottom:14 }}>{t.demoLabel}</p>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(28px,4.5vw,46px)",fontWeight:400,color:H.text }}>{t.demoTitle} <em style={{ color:H.primary }}>ONEDM</em></h2>
          </div>
          <div style={{ display:"flex",gap:4,justifyContent:"center",marginBottom:36,background:H.bg,borderRadius:14,padding:4,width:"fit-content",margin:"0 auto 36px" }}>
            {[["itinerary",t.tabItinerary],["meal",t.tabMeal]].map(([k,l])=>(
              <button key={k} onClick={()=>setTab(k)} style={{ padding:"10px 28px",borderRadius:12,border:"none",background:tab===k?H.bgAlt:"transparent",color:tab===k?H.primary:H.textMuted,fontSize:13,cursor:"pointer",transition:"all .25s",fontFamily:"'Outfit',sans-serif",fontWeight:tab===k?600:400,boxShadow:tab===k?H.shadow:"none" }}>{l}</button>
            ))}
          </div>
          <div key={tab} style={{ animation:"riseIn .4s ease" }}>{tab==="itinerary"?<Itinerary/>:<MealPlanner/>}</div>
        </div>
      </Sec>

      {/* CULTURAL */}
      <Sec style={{ padding:"90px 20px" }}>
        <div style={{ maxWidth:1000,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:56 }}>
            <p style={{ fontSize:10,letterSpacing:3,color:"#E84393",fontFamily:"'DM Mono',monospace",textTransform:"uppercase",marginBottom:14 }}>{t.culturalLabel}</p>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(28px,4.5vw,46px)",fontWeight:400,lineHeight:1.2,color:H.text }}>{t.culturalTitle}<br/><em style={{ color:"#E84393" }}>{t.culturalTitleEm}</em></h2>
            <p style={{ color:H.textSub,fontSize:14,maxWidth:440,margin:"18px auto 0",lineHeight:1.75 }}>{t.culturalSub}</p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12 }}>
            {[
              { flag:"🇯🇵",city:"Tóquio", venue:"Senso-ji Temple",     sharing:"Filosofia Wabi-Sabi",   color:H.primary, partners:["🇫🇷","🇲🇿","🇧🇷"] },
              { flag:"🇲🇿",city:"Maputo", venue:"Museu Nacional",       sharing:"Arte Makonde",          color:"#00A8CC", partners:["🇰🇪","🇯🇵","🇧🇷"] },
              { flag:"🇫🇷",city:"Paris",  venue:"Le Marais Kitchen",    sharing:"Gastronomia Slow Food", color:H.coral,   partners:["🇯🇵","🇦🇪"] },
              { flag:"🇰🇪",city:"Nairobi",venue:"Maasai Cultural Ctr.", sharing:"Tradições Orais",       color:H.mint,    partners:["🇲🇿","🇧🇷","🇫🇷"] },
            ].map((c,i)=>(
              <div key={i} style={{ background:H.bgAlt,border:`1px solid ${H.border}`,borderRadius:18,padding:"22px 20px",boxShadow:H.shadow,animation:`riseIn .5s ease ${i*.1}s both` }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:14 }}><span style={{ fontSize:26 }}>{c.flag}</span><div style={{ display:"flex" }}>{c.partners.map((f,pi)=><span key={pi} style={{ fontSize:14,marginLeft:-3 }}>{f}</span>)}</div></div>
                <p style={{ fontSize:10,color:H.textMuted,marginBottom:3 }}>{c.city}</p>
                <p style={{ fontSize:14,fontWeight:600,color:H.text,marginBottom:10 }}>{c.venue}</p>
                <div style={{ background:`${c.color}10`,border:`1px solid ${c.color}20`,borderRadius:8,padding:"5px 10px",display:"inline-block" }}><span style={{ fontSize:10,color:c.color }}>✦ {c.sharing}</span></div>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* HOW IT WORKS */}
      <Sec style={{ padding:"40px 20px",background:H.bgAlt,borderTop:`1px solid ${H.border}` }}>
        <div style={{ maxWidth:900,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:56 }}>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(28px,4.5vw,46px)",fontWeight:400,color:H.text }}>{t.howTitle}<br/><em style={{ color:H.coral }}>{t.howTitleEm}</em></h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",border:`1px solid ${H.border}`,borderRadius:20,overflow:"hidden" }}>
            {t.steps.map((s,i)=>(
              <div key={i} style={{ padding:"32px 24px",background:H.bgAlt,borderRight:i<3?`1px solid ${H.border}`:"none" }}>
                <div style={{ fontFamily:"'DM Mono',monospace",fontSize:10,color:H.textMuted,letterSpacing:2,marginBottom:16 }}>{s.n}</div>
                <div style={{ fontSize:26,marginBottom:14 }}>{s.icon}</div>
                <h3 style={{ fontSize:15,fontWeight:600,color:H.text,marginBottom:8 }}>{s.title}</h3>
                <p style={{ fontSize:12,color:H.textSub,lineHeight:1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* CTA DARK */}
      <Sec style={{ background:H.bgDark,padding:"60px 20px",textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,rgba(61,47,232,0.2),transparent 65%)`,top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle,rgba(255,92,58,0.12),transparent 65%)`,bottom:"10%",right:"10%",pointerEvents:"none" }}/>
        <div style={{ position:"relative" }}>
          <div style={{ fontSize:10,letterSpacing:4,color:"rgba(255,255,255,0.3)",fontFamily:"'DM Mono',monospace",textTransform:"uppercase",marginBottom:22 }}>{t.ctaLabel}</div>
          <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(36px,6vw,64px)",fontWeight:400,marginBottom:18,lineHeight:1.06,color:"#fff" }}>{t.ctaTitle}<br/><em style={{ color:"#7C6FFF" }}>{t.ctaTitleEm}</em></h2>
          <p style={{ color:"rgba(255,255,255,0.38)",fontSize:14,maxWidth:360,margin:"0 auto 48px",lineHeight:1.75 }}>{t.ctaSub}</p>
          <Waitlist dark/>
          <div style={{ marginTop:32 }}>
            <button onClick={()=>{setPage("partners");window.scrollTo(0,0);}} style={{ background:"transparent",border:"1px solid rgba(255,255,255,0.15)",borderRadius:14,padding:"12px 28px",color:"rgba(255,255,255,0.5)",fontSize:13,cursor:"pointer" }}>{t.ctaPartnerBtn}</button>
          </div>
        </div>
      </Sec>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE PARTNERS
═══════════════════════════════════════════════════════════════════════════ */
function PagePartners({ setPage, onFormSuccess }) {
  const { t } = useLang();
  const formRef=useRef();
  const scrollToForm=()=>formRef.current?.scrollIntoView({behavior:"smooth",block:"center"});
  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"130px 24px 80px",position:"relative",overflow:"hidden" }}>
        {[680,500,340].map((s,i)=><div key={i} style={{ position:"absolute",width:s,height:s,borderRadius:"50%",border:`1px solid rgba(61,47,232,${.04+i*.025})`,top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none" }}/>)}
        <div style={{ position:"absolute",width:600,height:400,borderRadius:"50%",background:`radial-gradient(ellipse,rgba(61,47,232,0.07),transparent 65%)`,top:"35%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none" }}/>
        <div style={{ animation:"riseIn .6s ease",marginBottom:24 }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:H.bgAlt,border:`1px solid ${H.border}`,borderRadius:24,padding:"8px 18px",boxShadow:H.shadow }}>
            <div style={{ width:7,height:7,borderRadius:"50%",background:H.coral,animation:"pulseDot 1.5s ease-in-out infinite" }}/>
            <span style={{ fontSize:12,color:H.textSub }}>{t.partnersUrgency} <strong style={{ color:H.coral }}>23</strong> {t.partnersVagas}</span>
          </div>
        </div>
        <div style={{ animation:"riseIn .7s ease .1s both",marginBottom:16 }}><span style={{ fontSize:11,letterSpacing:4,color:H.primary,fontFamily:"'DM Mono',monospace",textTransform:"uppercase" }}>{t.partnersProgram}</span></div>
        <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(36px,10vw,58px)",fontWeight:400,lineHeight:1.04,marginBottom:22,maxWidth:820,animation:"riseIn .9s ease .2s both",color:H.text }}>{t.partnersHeroTitle}<br/>{t.partnersHeroTitle2}<br/><em style={{ color:H.primary }}>{t.partnersHeroTitleEm}</em></h1>
        <p style={{ fontSize:"clamp(15px,1.8vw,18px)",color:H.textSub,maxWidth:520,lineHeight:1.8,marginBottom:44,fontWeight:300,animation:"riseIn .9s ease .35s both" }}>{t.partnersHeroSub}</p>
        <div style={{ display:"flex",flexDirection:"column",gap:10,alignItems:"center",animation:"riseIn .9s ease .5s both",width:"100%",maxWidth:400 }}>
          <button onClick={scrollToForm} style={{ background:`linear-gradient(135deg,${H.primary},${H.purple})`,border:"none",borderRadius:14,padding:"15px 36px",color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer",boxShadow:`0 8px 28px rgba(61,47,232,0.3)` }}>{t.partnersJoin}</button>
          <button onClick={()=>{setPage("home");window.scrollTo(0,0);}} style={{ background:"transparent",border:`1px solid ${H.borderMed}`,borderRadius:14,padding:"15px 28px",color:H.textSub,fontSize:14,cursor:"pointer" }}>{t.partnersSeeApp}</button>
        </div>
        {[{ name:"Pemba Beach Hotel",type:"Hotel · Cabo Delgado",flag:"🇲🇿",color:H.primary,pos:{top:"24%",left:"5%"},delay:"0s" },{ name:"Tofo Mar Resort",type:"Lodge · Inhambane",flag:"🏖️",color:H.mint,pos:{top:"32%",right:"4%"},delay:".7s" },{ name:"Casa Rex",type:"Restaurante · Maputo",flag:"🍽️",color:H.coral,pos:{bottom:"22%",left:"4%"},delay:"1.2s" }].map((v,i)=>(
          <div key={i} style={{ position:"absolute",...v.pos,background:"rgba(255,255,255,0.88)",backdropFilter:"blur(14px)",border:`1px solid ${v.color}22`,borderRadius:16,padding:"10px 16px",animation:`float ${3.2+i*.4}s ease-in-out infinite`,animationDelay:v.delay,boxShadow:"0 6px 24px rgba(18,14,40,0.09)" }}>
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <span style={{ fontSize:20 }}>{v.flag}</span>
              <div><p style={{ fontSize:11,fontWeight:600,color:H.text }}>{v.name}</p><p style={{ fontSize:9,color:H.textMuted,fontFamily:"'DM Mono',monospace" }}>{v.type}</p></div>
              <div style={{ width:18,height:18,borderRadius:"50%",background:`${v.color}15`,border:`1px solid ${v.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:v.color,marginLeft:4 }}>✓</div>
            </div>
          </div>
        ))}
      </section>

      {/* STATS DARK */}
      <Sec style={{ padding:"0 20px 60px" }}>
        <div style={{ maxWidth:900,margin:"0 auto",background:H.bgDark,borderRadius:24,overflow:"hidden",boxShadow:H.shadowLg,display:"grid",gridTemplateColumns:"repeat(4,1fr)" }}>
          {[["3,200+",t.partnersTravellers,H.primary],["180+",t.partnersCountries,H.coral],["Gratuito",t.partnersFree,H.mint],["23",t.partnersSlots,H.amber]].map(([n,l,c],i)=>(
            <div key={i} style={{ padding:"28px 20px",textAlign:"center",borderRight:i<3?"1px solid rgba(255,255,255,0.06)":"none" }}>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:26,color:c,marginBottom:5 }}>{n}</div>
              <div style={{ fontSize:10,color:"rgba(255,255,255,0.35)",letterSpacing:2,textTransform:"uppercase",fontFamily:"'DM Mono',monospace" }}>{l}</div>
            </div>
          ))}
        </div>
      </Sec>

      {/* BENEFITS */}
      <Sec style={{ padding:"60px 20px 90px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ marginBottom:56 }}>
            <p style={{ fontSize:10,letterSpacing:3,color:H.primary,fontFamily:"'DM Mono',monospace",textTransform:"uppercase",marginBottom:12 }}>{t.benefitsLabel}</p>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(28px,4vw,48px)",fontWeight:400,lineHeight:1.15,color:H.text,maxWidth:560 }}>{t.benefitsTitle}<br/><em style={{ color:H.coral }}>{t.benefitsTitleEm}</em></h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14 }}>
            {t.benefits.map((b,i)=>(
              <div key={i} style={{ background:H.bgAlt,border:`1px solid ${H.border}`,borderRadius:20,padding:"28px 24px",boxShadow:H.shadow,animation:`riseIn .5s ease ${i*.1}s both`,position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",top:0,right:0,width:80,height:80,borderRadius:"0 20px 0 80px",background:`${[H.primary,H.mint,H.coral,H.amber][i]}06` }}/>
                <div style={{ fontSize:28,marginBottom:16 }}>{b.icon}</div>
                <h3 style={{ fontSize:16,fontWeight:600,color:H.text,marginBottom:10,lineHeight:1.3 }}>{b.title}</h3>
                <p style={{ fontSize:13,color:H.textSub,lineHeight:1.7,marginBottom:20 }}>{b.desc}</p>
                <div style={{ display:"flex",alignItems:"baseline",gap:6 }}>
                  <span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,color:[H.primary,H.mint,H.coral,H.amber][i] }}>{b.stat}</span>
                  <span style={{ fontSize:10,color:H.textMuted,letterSpacing:1,textTransform:"uppercase",fontFamily:"'DM Mono',monospace" }}>{b.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* HOW PARTNER */}
      <Sec style={{ padding:"40px 20px",background:H.bgAlt,borderTop:`1px solid ${H.border}`,borderBottom:`1px solid ${H.border}` }}>
        <div style={{ maxWidth:900,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:56 }}>
            <p style={{ fontSize:10,letterSpacing:3,color:H.mint,fontFamily:"'DM Mono',monospace",textTransform:"uppercase",marginBottom:12 }}>{t.howPartnerLabel}</p>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(28px,4vw,46px)",fontWeight:400,color:H.text }}>{t.howPartnerTitle}<br/><em style={{ color:H.mint }}>{t.howPartnerTitleEm}</em></h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(185px,1fr))",border:`1px solid ${H.border}`,borderRadius:20,overflow:"hidden" }}>
            {t.partnerSteps.map((s,i)=>(
              <div key={i} style={{ padding:"32px 24px",background:H.bgAlt,borderRight:i<3?`1px solid ${H.border}`:"none",position:"relative" }}>
                {i<3&&<div style={{ position:"absolute",right:-8,top:"50%",transform:"translateY(-50%)",width:16,height:16,background:H.bgAlt,border:`1px solid ${H.border}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:H.primary,zIndex:2 }}>→</div>}
                <div style={{ fontFamily:"'DM Mono',monospace",fontSize:10,color:H.primary,letterSpacing:2,marginBottom:16 }}>{s.n}</div>
                <h3 style={{ fontSize:15,fontWeight:600,color:H.text,marginBottom:8 }}>{s.title}</h3>
                <p style={{ fontSize:12,color:H.textSub,lineHeight:1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* FOUNDER QUOTE — Meyzel + Yanick */}
      <Sec style={{ padding:"90px 20px" }}>
        <div style={{ maxWidth:820,margin:"0 auto",textAlign:"center" }}>
          <div style={{ fontSize:48,marginBottom:24,animation:"float 4s ease-in-out infinite" }}>🇲🇿</div>
          <blockquote style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(18px,2.8vw,28px)",fontWeight:400,lineHeight:1.6,color:H.text,fontStyle:"italic",marginBottom:36 }}>{t.quote}</blockquote>
          <div style={{ display:"flex",justifyContent:"center",gap:32,flexWrap:"wrap" }}>
            {[
              { initial:"M", name:"Meyzel Jamal",   role:"Fundador & CEO · ONEDM" },
              { initial:"Y", name:"Yanick Ginabay",  role:"Co-Fundador · ONEDM" },
            ].map((f,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div style={{ width:40,height:40,borderRadius:"50%",background:i===0?`linear-gradient(135deg,${H.primary},${H.purple})`:`linear-gradient(135deg,${H.mint},#00A8CC)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:15,fontWeight:700 }}>{f.initial}</div>
                <div style={{ textAlign:"left" }}>
                  <p style={{ fontSize:14,fontWeight:600,color:H.text }}>{f.name}</p>
                  <p style={{ fontSize:11,color:H.textMuted,fontFamily:"'DM Mono',monospace" }}>{f.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* FORM */}
      <Sec style={{ padding:"40px 20px 70px",background:H.bg }}>
        <div ref={formRef} style={{ maxWidth:760,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:H.primaryLight,border:`1px solid ${H.primaryBorder}`,borderRadius:24,padding:"7px 18px",marginBottom:20 }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:H.coral,animation:"pulseDot 1.5s ease-in-out infinite" }}/>
              <span style={{ fontSize:11,color:H.primary,fontFamily:"'DM Mono',monospace",letterSpacing:1.5 }}>{t.formBadge}</span>
            </div>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(28px,4vw,46px)",fontWeight:400,color:H.text,marginBottom:12 }}>{t.formTitle}<br/><em style={{ color:H.primary }}>{t.formTitleEm}</em></h2>
            <p style={{ color:H.textSub,fontSize:14,maxWidth:440,margin:"0 auto",lineHeight:1.75 }}>{t.formSub}</p>
          </div>
          <div style={{ background:H.bgAlt,border:`1px solid ${H.border}`,borderRadius:24,padding:"24px",boxShadow:H.shadowLg }}>
            <PartnerForm onSuccess={d=>{onFormSuccess(d);window.scrollTo(0,0);}}/>
          </div>
        </div>
      </Sec>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE PARTNER CONFIRM
═══════════════════════════════════════════════════════════════════════════ */
function PagePartnerConfirm({ data, setPage }) {
  const { t } = useLang();
  return (
    <div style={{ minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"100px 20px 60px",position:"relative",overflow:"hidden" }}>
      {[600,420,260].map((s,i)=><div key={i} style={{ position:"absolute",width:s,height:s,borderRadius:"50%",border:`1px solid rgba(61,47,232,${.04+i*.02})`,top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none" }}/>)}
      <div style={{ position:"absolute",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,rgba(61,47,232,0.06),transparent 65%)`,top:"40%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none" }}/>
      <div style={{ maxWidth:640,width:"100%",textAlign:"center",animation:"riseIn .7s ease" }}>
        <div style={{ width:80,height:80,borderRadius:"50%",background:`linear-gradient(135deg,${H.primary},${H.purple})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 28px",boxShadow:`0 16px 48px rgba(61,47,232,0.3)`,animation:"scaleIn .6s cubic-bezier(.175,.885,.32,1.275)",color:"#fff" }}>✦</div>
        <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:H.mintLight,border:`1px solid ${H.mintBorder}`,borderRadius:24,padding:"7px 18px",marginBottom:24 }}>
          <div style={{ width:6,height:6,borderRadius:"50%",background:H.mint,animation:"pulseDot 1.5s ease-in-out infinite" }}/>
          <span style={{ fontSize:11,color:H.mint,fontFamily:"'DM Mono',monospace",letterSpacing:1.5 }}>{t.confirmBadge}</span>
        </div>
        <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(32px,5vw,54px)",fontWeight:400,color:H.text,marginBottom:12,lineHeight:1.1 }}>{t.confirmTitle}<br/><em style={{ color:H.primary }}>{t.confirmTitleEm}</em></h1>
        <p style={{ color:H.textSub,fontSize:16,lineHeight:1.75,marginBottom:8 }}><strong style={{ color:H.text }}>{data?.name}</strong> {t.confirmSub}</p>
        <p style={{ color:H.textMuted,fontSize:14,marginBottom:48 }}>{t.confirmContact} <strong style={{ color:H.primary }}>{data?.email}</strong> {t.confirmContactSub}</p>
        <div style={{ background:H.bgAlt,border:`1px solid ${H.border}`,borderRadius:20,padding:"32px",marginBottom:36,boxShadow:H.shadow,textAlign:"left" }}>
          <p style={{ fontSize:10,letterSpacing:3,color:H.primary,fontFamily:"'DM Mono',monospace",textTransform:"uppercase",marginBottom:24 }}>{t.confirmNext}</p>
          {t.confirmSteps.map((s,i)=>(
            <div key={i} style={{ display:"flex",gap:16,alignItems:"flex-start",marginBottom:i<t.confirmSteps.length-1?20:0,opacity:s.done?1:0.5 }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:s.done?`linear-gradient(135deg,${H.primary},${H.purple})`:H.bg,border:`1px solid ${s.done?H.primary:H.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0,color:s.done?"#fff":H.textSub }}>{s.done?"✓":s.icon}</div>
              <div style={{ flex:1,paddingTop:4 }}>
                <p style={{ fontSize:14,fontWeight:600,color:H.text,marginBottom:3 }}>{s.title}</p>
                <p style={{ fontSize:12,color:H.textSub,lineHeight:1.6 }}>{s.desc}</p>
              </div>
              {s.done&&<span style={{ fontSize:10,padding:"3px 10px",borderRadius:10,background:H.mintLight,color:H.mint,border:`1px solid ${H.mintBorder}`,whiteSpace:"nowrap",marginTop:4 }}>{t.confirmDone}</span>}
            </div>
          ))}
        </div>
        <div style={{ background:H.primaryLight,border:`1px solid ${H.primaryBorder}`,borderRadius:16,padding:"20px 24px",marginBottom:36 }}>
          <p style={{ fontSize:13,color:H.primary,fontWeight:600,marginBottom:6 }}>{t.shareTitle}</p>
          <p style={{ fontSize:12,color:H.textSub,lineHeight:1.65,marginBottom:16 }}>{t.shareSub}</p>
          <button onClick={()=>{try{navigator.clipboard.writeText("onedm.com/partners");}catch(e){}}} style={{ background:`linear-gradient(135deg,${H.primary},${H.purple})`,border:"none",borderRadius:10,padding:"9px 20px",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer" }}>{t.shareCopy}</button>
        </div>
        <button onClick={()=>{setPage("home");window.scrollTo(0,0);}} style={{ background:"transparent",border:`1px solid ${H.borderMed}`,borderRadius:14,padding:"13px 32px",color:H.textSub,fontSize:14,cursor:"pointer" }}>{t.confirmBack}</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE PRIVACY
═══════════════════════════════════════════════════════════════════════════ */
const PRIVACY_CONTENT = {
  PT: {
    title: "Política de Privacidade",
    updated: "Última actualização: Maio 2026",
    sections: [
      { title: "1. Quem somos", body: "O ONEDM (One Destination Manager) é uma plataforma digital desenvolvida por Meyzel Jamal e Yanick Ginabay, com o objectivo de ajudar viajantes a planear destinos turísticos de forma personalizada. O responsável pelo tratamento dos dados é o ONEDM, contactável através do email: Onedmbrand@gmail.com." },
      { title: "2. Que dados recolhemos", body: "Recolhemos apenas os dados que nos forneces voluntariamente: endereço de email (para a lista de espera ou contacto), nome e detalhes do espaço (no caso de parceiros), e preferências alimentares introduzidas na demo da plataforma. Não recolhemos dados de forma automática além de cookies técnicos essenciais." },
      { title: "3. Para que usamos os dados", body: "Os teus dados são usados exclusivamente para: enviar comunicações sobre o lançamento do ONEDM (se estiveres na lista de espera), entrar em contacto com parceiros que submeteram o formulário, e melhorar a experiência da plataforma. Não vendemos, partilhamos nem cedemos os teus dados a terceiros para fins comerciais." },
      { title: "4. Quanto tempo guardamos os dados", body: "Os dados da lista de espera são guardados até ao lançamento oficial da plataforma ou até solicitares a remoção. Os dados de parceiros são guardados enquanto a relação de parceria estiver activa. Podes solicitar a eliminação dos teus dados a qualquer momento." },
      { title: "5. Os teus direitos", body: "Tens o direito de aceder, corrigir, exportar ou eliminar os teus dados pessoais. Para exercer qualquer um destes direitos, basta enviar um email para Onedmbrand@gmail.com com o assunto 'Dados Pessoais'. Respondemos no prazo de 7 dias úteis." },
      { title: "6. Segurança", body: "Adoptamos medidas técnicas e organizacionais adequadas para proteger os teus dados contra acesso não autorizado, perda ou destruição. Os dados são armazenados em servidores seguros com acesso restrito." },
      { title: "7. Cookies", body: "O ONEDM utiliza apenas cookies técnicos estritamente necessários para o funcionamento da plataforma. Não utilizamos cookies de rastreamento, publicidade ou análise de terceiros." },
      { title: "8. Contacto", body: "Para qualquer questão relacionada com a tua privacidade, contacta-nos em: Onedmbrand@gmail.com" },
    ]
  },
  EN: {
    title: "Privacy Policy",
    updated: "Last updated: May 2026",
    sections: [
      { title: "1. Who we are", body: "ONEDM (One Destination Manager) is a digital platform developed by Meyzel Jamal and Yanick Ginabay, designed to help travellers plan tourist destinations in a personalised way. The data controller is ONEDM, reachable at: Onedmbrand@gmail.com." },
      { title: "2. What data we collect", body: "We only collect data you voluntarily provide: email address (for the waitlist or contact), name and venue details (for partners), and dietary preferences entered in the platform demo. We do not collect data automatically beyond essential technical cookies." },
      { title: "3. How we use your data", body: "Your data is used exclusively to: send communications about the ONEDM launch (if you're on the waitlist), contact partners who submitted the form, and improve the platform experience. We do not sell, share, or transfer your data to third parties for commercial purposes." },
      { title: "4. How long we keep your data", body: "Waitlist data is kept until the official platform launch or until you request removal. Partner data is kept while the partnership is active. You can request deletion of your data at any time." },
      { title: "5. Your rights", body: "You have the right to access, correct, export or delete your personal data. To exercise any of these rights, send an email to Onedmbrand@gmail.com with the subject 'Personal Data'. We respond within 7 business days." },
      { title: "6. Security", body: "We adopt appropriate technical and organisational measures to protect your data against unauthorised access, loss or destruction. Data is stored on secure servers with restricted access." },
      { title: "7. Cookies", body: "ONEDM only uses strictly necessary technical cookies for platform operation. We do not use tracking, advertising or third-party analytics cookies." },
      { title: "8. Contact", body: "For any privacy-related questions, contact us at: Onedmbrand@gmail.com" },
    ]
  },
  FR: {
    title: "Politique de Confidentialité",
    updated: "Dernière mise à jour : Mai 2026",
    sections: [
      { title: "1. Qui sommes-nous", body: "ONEDM (One Destination Manager) est une plateforme numérique développée par Meyzel Jamal et Yanick Ginabay, conçue pour aider les voyageurs à planifier des destinations touristiques de manière personnalisée. Le responsable du traitement des données est ONEDM, joignable à : Onedmbrand@gmail.com." },
      { title: "2. Données collectées", body: "Nous ne collectons que les données que tu fournis volontairement : adresse email (pour la liste d'attente ou contact), nom et détails du lieu (pour les partenaires), et préférences alimentaires saisies dans la démo. Nous ne collectons pas de données automatiquement au-delà des cookies techniques essentiels." },
      { title: "3. Utilisation des données", body: "Tes données sont utilisées exclusivement pour : envoyer des communications sur le lancement d'ONEDM, contacter les partenaires ayant soumis le formulaire, et améliorer l'expérience de la plateforme. Nous ne vendons, partageons ni cédons tes données à des tiers à des fins commerciales." },
      { title: "4. Durée de conservation", body: "Les données de la liste d'attente sont conservées jusqu'au lancement officiel ou jusqu'à ta demande de suppression. Les données partenaires sont conservées pendant la durée de la relation. Tu peux demander la suppression de tes données à tout moment." },
      { title: "5. Tes droits", body: "Tu as le droit d'accéder, corriger, exporter ou supprimer tes données personnelles. Pour exercer ces droits, envoie un email à Onedmbrand@gmail.com avec l'objet 'Données Personnelles'. Nous répondons sous 7 jours ouvrés." },
      { title: "6. Sécurité", body: "Nous adoptons des mesures techniques et organisationnelles appropriées pour protéger tes données contre tout accès non autorisé, perte ou destruction." },
      { title: "7. Cookies", body: "ONEDM utilise uniquement des cookies techniques strictement nécessaires au fonctionnement de la plateforme. Nous n'utilisons pas de cookies de suivi, de publicité ou d'analyse tiers." },
      { title: "8. Contact", body: "Pour toute question relative à ta confidentialité : Onedmbrand@gmail.com" },
    ]
  },
  ES: {
    title: "Política de Privacidad",
    updated: "Última actualización: Mayo 2026",
    sections: [
      { title: "1. Quiénes somos", body: "ONEDM (One Destination Manager) es una plataforma digital desarrollada por Meyzel Jamal y Yanick Ginabay, diseñada para ayudar a los viajeros a planificar destinos turísticos de forma personalizada. El responsable del tratamiento de datos es ONEDM, contactable en: Onedmbrand@gmail.com." },
      { title: "2. Qué datos recopilamos", body: "Solo recopilamos los datos que nos proporcionas voluntariamente: dirección de email (para la lista de espera o contacto), nombre y detalles del espacio (para socios), y preferencias alimentarias introducidas en la demo. No recopilamos datos automáticamente más allá de las cookies técnicas esenciales." },
      { title: "3. Para qué usamos los datos", body: "Tus datos se usan exclusivamente para: enviar comunicaciones sobre el lanzamiento de ONEDM, contactar a los socios que enviaron el formulario, y mejorar la experiencia de la plataforma. No vendemos, compartimos ni cedemos tus datos a terceros con fines comerciales." },
      { title: "4. Cuánto tiempo guardamos los datos", body: "Los datos de la lista de espera se guardan hasta el lanzamiento oficial o hasta que solicites su eliminación. Los datos de socios se guardan mientras la relación esté activa. Puedes solicitar la eliminación de tus datos en cualquier momento." },
      { title: "5. Tus derechos", body: "Tienes derecho a acceder, corregir, exportar o eliminar tus datos personales. Para ejercer cualquiera de estos derechos, envía un email a Onedmbrand@gmail.com con el asunto 'Datos Personales'. Respondemos en 7 días hábiles." },
      { title: "6. Seguridad", body: "Adoptamos medidas técnicas y organizativas adecuadas para proteger tus datos contra accesos no autorizados, pérdida o destrucción." },
      { title: "7. Cookies", body: "ONEDM utiliza únicamente cookies técnicas estrictamente necesarias para el funcionamiento de la plataforma. No utilizamos cookies de seguimiento, publicidad ni análisis de terceros." },
      { title: "8. Contacto", body: "Para cualquier consulta sobre privacidad: Onedmbrand@gmail.com" },
    ]
  },
};

const TERMS_CONTENT = {
  PT: {
    title: "Termos e Condições",
    updated: "Última actualização: Maio 2026",
    sections: [
      { title: "1. Aceitação dos termos", body: "Ao aceder ou utilizar a plataforma ONEDM, concordas com estes Termos e Condições. Se não concordares com alguma parte destes termos, não deves utilizar os nossos serviços." },
      { title: "2. O serviço", body: "O ONEDM é uma plataforma em fase de desenvolvimento (early stage) que permite a viajantes planear destinos, personalizar refeições e descobrir instâncias turísticas. Durante o período de lançamento, o serviço é oferecido gratuitamente e pode estar sujeito a alterações, interrupções ou descontinuação sem aviso prévio." },
      { title: "3. Lista de espera", body: "Ao inscrever-te na lista de espera, autorizas o ONEDM a enviar-te comunicações sobre o desenvolvimento e lançamento da plataforma. Podes cancelar a subscrição a qualquer momento através do link de cancelamento presente em cada email." },
      { title: "4. Programa de Parceiros", body: "Ao submeter o formulário de parceiro, o teu espaço será avaliado pela equipa ONEDM. A submissão não garante a inclusão na plataforma. O ONEDM reserva-se o direito de recusar, suspender ou remover qualquer parceiro que não cumpra os requisitos de qualidade ou que viole estes termos." },
      { title: "5. Propriedade intelectual", body: "Todo o conteúdo da plataforma ONEDM — incluindo design, logótipo, textos e código — é propriedade exclusiva do ONEDM. É proibida a reprodução, distribuição ou utilização deste conteúdo sem autorização expressa por escrito." },
      { title: "6. Limitação de responsabilidade", body: "O ONEDM não se responsabiliza por danos directos ou indirectos decorrentes da utilização da plataforma, imprecisões nas informações sobre destinos ou instâncias turísticas, ou interrupções no serviço. A plataforma é fornecida 'tal como está', sem garantias de disponibilidade contínua." },
      { title: "7. Conduta do utilizador", body: "Ao utilizar o ONEDM, comprometes-te a não publicar conteúdo falso, ofensivo ou ilegal, não tentar aceder a áreas restritas da plataforma, e não utilizar o serviço para fins comerciais não autorizados." },
      { title: "8. Alterações aos termos", body: "O ONEDM reserva-se o direito de actualizar estes termos a qualquer momento. As alterações serão comunicadas por email ou através da plataforma. A utilização continuada após a notificação constitui aceitação dos novos termos." },
      { title: "9. Lei aplicável", body: "Estes termos são regidos pela lei moçambicana. Qualquer litígio será resolvido nos tribunais competentes da República de Moçambique." },
      { title: "10. Contacto", body: "Para questões sobre estes termos: Onedmbrand@gmail.com" },
    ]
  },
  EN: {
    title: "Terms and Conditions",
    updated: "Last updated: May 2026",
    sections: [
      { title: "1. Acceptance of terms", body: "By accessing or using the ONEDM platform, you agree to these Terms and Conditions. If you do not agree with any part of these terms, you should not use our services." },
      { title: "2. The service", body: "ONEDM is an early-stage platform that allows travellers to plan destinations, personalise meals and discover tourist venues. During the launch period, the service is offered free of charge and may be subject to changes, interruptions or discontinuation without prior notice." },
      { title: "3. Waitlist", body: "By signing up for the waitlist, you authorise ONEDM to send you communications about the development and launch of the platform. You can unsubscribe at any time via the unsubscribe link in each email." },
      { title: "4. Partner Programme", body: "By submitting the partner form, your venue will be evaluated by the ONEDM team. Submission does not guarantee inclusion on the platform. ONEDM reserves the right to refuse, suspend or remove any partner that does not meet quality requirements or violates these terms." },
      { title: "5. Intellectual property", body: "All content on the ONEDM platform — including design, logo, texts and code — is the exclusive property of ONEDM. Reproduction, distribution or use of this content without express written permission is prohibited." },
      { title: "6. Limitation of liability", body: "ONEDM is not liable for direct or indirect damages resulting from use of the platform, inaccuracies in destination or venue information, or service interruptions. The platform is provided 'as is', without guarantees of continuous availability." },
      { title: "7. User conduct", body: "By using ONEDM, you agree not to post false, offensive or illegal content, not to attempt to access restricted areas of the platform, and not to use the service for unauthorised commercial purposes." },
      { title: "8. Changes to terms", body: "ONEDM reserves the right to update these terms at any time. Changes will be communicated by email or through the platform. Continued use after notification constitutes acceptance of the new terms." },
      { title: "9. Governing law", body: "These terms are governed by Mozambican law. Any dispute will be resolved in the competent courts of the Republic of Mozambique." },
      { title: "10. Contact", body: "For questions about these terms: Onedmbrand@gmail.com" },
    ]
  },
  FR: {
    title: "Conditions Générales d'Utilisation",
    updated: "Dernière mise à jour : Mai 2026",
    sections: [
      { title: "1. Acceptation des conditions", body: "En accédant ou en utilisant la plateforme ONEDM, tu acceptes ces Conditions Générales. Si tu n'es pas d'accord avec une partie de ces conditions, tu ne dois pas utiliser nos services." },
      { title: "2. Le service", body: "ONEDM est une plateforme en phase de développement qui permet aux voyageurs de planifier des destinations, personnaliser des repas et découvrir des lieux touristiques. Pendant la période de lancement, le service est offert gratuitement et peut être modifié ou interrompu sans préavis." },
      { title: "3. Liste d'attente", body: "En t'inscrivant sur la liste d'attente, tu autorises ONEDM à t'envoyer des communications sur le développement de la plateforme. Tu peux te désabonner à tout moment via le lien de désabonnement dans chaque email." },
      { title: "4. Programme Partenaires", body: "En soumettant le formulaire partenaire, ton lieu sera évalué par l'équipe ONEDM. La soumission ne garantit pas l'inclusion sur la plateforme. ONEDM se réserve le droit de refuser, suspendre ou supprimer tout partenaire." },
      { title: "5. Propriété intellectuelle", body: "Tout le contenu de la plateforme ONEDM est la propriété exclusive d'ONEDM. La reproduction ou distribution sans autorisation écrite expresse est interdite." },
      { title: "6. Limitation de responsabilité", body: "ONEDM n'est pas responsable des dommages directs ou indirects résultant de l'utilisation de la plateforme. La plateforme est fournie 'telle quelle', sans garantie de disponibilité continue." },
      { title: "7. Comportement de l'utilisateur", body: "En utilisant ONEDM, tu t'engages à ne pas publier de contenu faux, offensant ou illégal, et à ne pas utiliser le service à des fins commerciales non autorisées." },
      { title: "8. Modifications", body: "ONEDM se réserve le droit de mettre à jour ces conditions à tout moment. L'utilisation continue après notification constitue une acceptation des nouveaux termes." },
      { title: "9. Droit applicable", body: "Ces conditions sont régies par le droit mozambicain. Tout litige sera résolu devant les tribunaux compétents de la République du Mozambique." },
      { title: "10. Contact", body: "Pour toute question : Onedmbrand@gmail.com" },
    ]
  },
  ES: {
    title: "Términos y Condiciones",
    updated: "Última actualización: Mayo 2026",
    sections: [
      { title: "1. Aceptación de los términos", body: "Al acceder o utilizar la plataforma ONEDM, aceptas estos Términos y Condiciones. Si no estás de acuerdo con alguna parte, no debes utilizar nuestros servicios." },
      { title: "2. El servicio", body: "ONEDM es una plataforma en fase de desarrollo que permite a los viajeros planificar destinos, personalizar comidas y descubrir lugares turísticos. Durante el período de lanzamiento, el servicio se ofrece gratuitamente y puede estar sujeto a cambios o interrupciones sin previo aviso." },
      { title: "3. Lista de espera", body: "Al inscribirte en la lista de espera, autorizas a ONEDM a enviarte comunicaciones sobre el desarrollo y lanzamiento de la plataforma. Puedes cancelar la suscripción en cualquier momento." },
      { title: "4. Programa de Socios", body: "Al enviar el formulario de socio, tu espacio será evaluado por el equipo ONEDM. El envío no garantiza la inclusión en la plataforma. ONEDM se reserva el derecho de rechazar, suspender o eliminar cualquier socio." },
      { title: "5. Propiedad intelectual", body: "Todo el contenido de la plataforma ONEDM es propiedad exclusiva de ONEDM. Se prohíbe la reproducción o distribución sin autorización expresa por escrito." },
      { title: "6. Limitación de responsabilidad", body: "ONEDM no se responsabiliza por daños directos o indirectos derivados del uso de la plataforma. La plataforma se proporciona 'tal como está', sin garantías de disponibilidad continua." },
      { title: "7. Conducta del usuario", body: "Al usar ONEDM, te comprometes a no publicar contenido falso, ofensivo o ilegal, y a no usar el servicio para fines comerciales no autorizados." },
      { title: "8. Cambios en los términos", body: "ONEDM se reserva el derecho de actualizar estos términos en cualquier momento. El uso continuado tras la notificación constituye aceptación de los nuevos términos." },
      { title: "9. Ley aplicable", body: "Estos términos se rigen por la ley mozambiqueña. Cualquier disputa se resolverá en los tribunales competentes de la República de Mozambique." },
      { title: "10. Contacto", body: "Para preguntas sobre estos términos: Onedmbrand@gmail.com" },
    ]
  },
};

function PageLegal({ type, setPage }) {
  const { lang, t } = useLang();
  const content = type === "privacy" ? PRIVACY_CONTENT[lang] : TERMS_CONTENT[lang];
  return (
    <div style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:H.bg }}>
      <div style={{ maxWidth:760, margin:"0 auto", padding:"0 24px" }}>
        {/* Back */}
        <button onClick={()=>{ setPage("home"); window.scrollTo(0,0); }} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:H.primary, fontSize:13, marginBottom:48, padding:0, fontFamily:"'Outfit',sans-serif" }}>
          ← {lang==="PT"?"Voltar":lang==="EN"?"Back":lang==="FR"?"Retour":"Volver"}
        </button>

        {/* Header */}
        <div style={{ marginBottom:56 }}>
          <div style={{ display:"inline-block", background:H.primaryLight, border:`1px solid ${H.primaryBorder}`, borderRadius:20, padding:"5px 14px", fontSize:10, color:H.primary, fontFamily:"'DM Mono',monospace", letterSpacing:2, textTransform:"uppercase", marginBottom:20 }}>
            ONEDM · {type === "privacy" ? (lang==="PT"?"Privacidade":lang==="EN"?"Privacy":lang==="FR"?"Confidentialité":"Privacidad") : (lang==="PT"?"Termos":lang==="EN"?"Terms":lang==="FR"?"Conditions":"Términos")}
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(28px,4vw,46px)", fontWeight:400, color:H.text, marginBottom:12 }}>{content.title}</h1>
          <p style={{ fontSize:12, color:H.textMuted, fontFamily:"'DM Mono',monospace" }}>{content.updated}</p>
        </div>

        {/* Sections */}
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {content.sections.map((s, i) => (
            <div key={i} style={{ padding:"28px 0", borderBottom:`1px solid ${H.border}` }}>
              <h2 style={{ fontSize:16, fontWeight:600, color:H.text, marginBottom:12 }}>{s.title}</h2>
              <p style={{ fontSize:14, color:H.textSub, lineHeight:1.8 }}>{s.body}</p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div style={{ marginTop:56, padding:"28px 32px", background:H.bgAlt, border:`1px solid ${H.border}`, borderRadius:20, boxShadow:H.shadow, textAlign:"center" }}>
          <p style={{ fontSize:14, color:H.textSub, marginBottom:12 }}>
            {lang==="PT"?"Tens alguma dúvida?":lang==="EN"?"Have any questions?":lang==="FR"?"Des questions ?":"¿Tienes alguna duda?"}
          </p>
          <a href="mailto:Onedmbrand@gmail.com" style={{ color:H.primary, fontWeight:600, fontSize:15, textDecoration:"none" }}>Onedmbrand@gmail.com</a>
        </div>
      </div>
    </div>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
function Footer({ setPage }) {
  const { t } = useLang();
  return (
    <footer style={{ padding:"20px",background:H.bgAlt,borderTop:`1px solid ${H.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
      <button onClick={()=>{setPage("home");window.scrollTo(0,0);}} style={{ display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer" }}>
        <div style={{ width:6,height:6,borderRadius:"50%",background:H.primary }}/>
        <span style={{ fontFamily:"'DM Mono',monospace",fontSize:12,letterSpacing:4,color:H.primary }}>ONEDM</span>
      </button>
      <span style={{ color:H.textMuted,fontSize:11 }}>One Destination Manager · Early Stage · Global</span>
      <div style={{ display:"flex",gap:20,fontSize:11,color:H.textSub }}>
        <span style={{ cursor:"pointer" }} onClick={()=>{setPage("partners");window.scrollTo(0,0);}}>{t.footerPartners}</span>
        <span style={{ cursor:"pointer" }} onClick={()=>{setPage("privacy");window.scrollTo(0,0);}}>{t.footerPrivacy}</span>
        <span style={{ cursor:"pointer" }} onClick={()=>{setPage("terms");window.scrollTo(0,0);}}>{t.footerTerms}</span>
      </div>
    </footer>
  );
}

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const lbl = { fontSize:9,letterSpacing:2,color:H.textMuted,textTransform:"uppercase",display:"block",marginBottom:7,fontFamily:"'DM Mono',monospace" };

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [partnerData, setPartnerData] = useState(null);
  const [lang, setLang] = useState("PT");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Mono:wght@300;400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:${H.bg};overflow-x:hidden;}
        ::selection{background:rgba(61,47,232,0.12);}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:rgba(61,47,232,0.2);border-radius:2px;}
        @keyframes riseIn   {from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        @keyframes float    {0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        @keyframes spin     {to{transform:rotate(360deg);}}
        @keyframes loadBar  {0%{width:0;margin-left:0;}50%{width:60%;margin-left:20%;}100%{width:0;margin-left:100%;}}
        @keyframes pulse    {0%,100%{opacity:.35;}50%{opacity:1;}}
        @keyframes pulseDot {0%,100%{opacity:.4;transform:scale(1);}50%{opacity:1;transform:scale(1.3);}}
        @keyframes scaleIn  {from{opacity:0;transform:scale(.6);}to{opacity:1;transform:scale(1);}}
        input[type=range]{-webkit-appearance:none;height:3px;background:rgba(18,14,40,0.1);border-radius:2px;outline:none;cursor:pointer;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;cursor:pointer;border:2px solid ${H.bg};}
        select option{background:#fff;color:#120E28;}
        button,a{-webkit-tap-highlight-color:transparent;}
        *{-webkit-font-smoothing:antialiased;}
        @media(max-width:768px){
          input[type=range]::-webkit-slider-thumb{width:22px;height:22px;}
        }
      `}</style>
      <LangCtx.Provider value={{ lang, t:T[lang], setLang }}>
        <div style={{ minHeight:"100vh",background:H.bg,color:H.text,fontFamily:"'Outfit',sans-serif" }}>
          {page!=="confirm"&&<Nav page={page} setPage={setPage}/>}
          {page==="home"    &&<PageHome     setPage={setPage}/>}
          {page==="partners"&&<PagePartners setPage={setPage} onFormSuccess={d=>{setPartnerData(d);setPage("confirm");}}/>}
          {page==="confirm" &&<PagePartnerConfirm data={partnerData} setPage={setPage}/>}
          {page==="privacy" &&<PageLegal type="privacy" setPage={setPage}/>}
          {page==="terms"   &&<PageLegal type="terms"   setPage={setPage}/>}
          <Footer setPage={setPage}/>
        </div>
      </LangCtx.Provider>
    </>
  );
}
