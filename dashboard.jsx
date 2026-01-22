import React, { useState, useMemo } from 'react';
import { MapPin, Utensils, Calendar, Star, ExternalLink, Filter, ChefHat } from 'lucide-react';

const RestaurantDashboard = () => {
  const restaurantsData = [
    {
      "name": "FIGUEIRA RUBAIYAT",
      "address": "Rua Haddock Lobo, 1738",
      "city": "SAO PAULO",
      "neighborhood": "JARDINS",
      "foodType": "BRASILEIRA",
      "menu": "https://gruporubaiyat.com/en/casas-menu/a-figueira-rubaiyat/",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "D.O.M RESTAURANTE ",
      "address": "Rua Barao de Capanema, 549, São Paulo",
      "city": "SAO PAULO",
      "neighborhood": "JARDINS",
      "foodType": "BRASILEIRA",
      "menu": "https://domrestaurante.com.br/pt-br/menu.html",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "HIGH"
    },
    {
      "name": "DALVA E DITO POR ALEX ATALA",
      "address": "R. Padre João Manuel, 1115 - Cerqueira César, São Paulo - SP, 01411-001",
      "city": "SAO PAULO",
      "neighborhood": "Cerqueira César",
      "foodType": "BRASILEIRA",
      "menu": "https://restaurantepontremoli.com.br/",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "RESTAURANTE DHOMUS",
      "address": "R. Amauri, 27 - Jardim Europa, São Paulo - SP, 01448-000",
      "city": "SAO PAULO",
      "neighborhood": "Jardim Europa",
      "foodType": "MEDITERRANEA",
      "menu": "https://www.instagram.com/stories/highlights/17950497242425696/?hl=en",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "VIRO BISTRO",
      "address": "Rua Haddock Lobo, 74 - Cerqueira César, São Paulo - SP, 01414-000",
      "city": "SAO PAULO",
      "neighborhood": "Cerqueira César",
      "foodType": "VARIADA",
      "menu": "https://virobistro.com/vbcampinas.html",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "NAO",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "BRAZA GASTRONOMIA",
      "address": " R. Palestra Itália, 200 - Água Branca, São Paulo - SP, 05005-030",
      "city": "SAO PAULO",
      "neighborhood": "Água Branca",
      "foodType": "BRASILEIRA",
      "menu": "https://www.brazagastronomia.com.br/_files/ugd/3e747f_6c5c863c017a4f40aeca17802b1c1eee.pdf",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "NAO",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "CASARIA SP",
      "address": "Alameda Franca, 1243, Rua Haddock Lobo, 1077 - Jardim Paulista, São Paulo - SP, 01422-001",
      "city": "SAO PAULO",
      "neighborhood": "Jardim Paulista",
      "foodType": "BRUNCH",
      "menu": "https://drive.google.com/file/d/17mxDv2jj_00SC5EqTUXhRsBXH5inEaZM/view",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "NAO",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "AQUILES",
      "address": "R. Pedroso Alvarenga, 909 - Itaim Bibi, São Paulo - SP, 04531-011",
      "city": "SAO PAULO",
      "neighborhood": "Itaim Bibi",
      "foodType": "MEDITERRANEA",
      "menu": "https://vejasp.abril.com.br/wp-content/uploads/2022/06/menu-aquiles-4.pdf",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "Le Manjue",
      "address": "Alameda Lorena, 1004 - Jardins/SP",
      "city": "SAO PAULO",
      "neighborhood": "JARDINS",
      "foodType": "FITNESS",
      "menu": "https://www.lemanjue.com/menu-cafe",
      "occasion": "NORMAL",
      "type": "FITNESS",
      "status": "PENDING",
      "reservation": "NAO",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "Isabela Akkari",
      "address": "R. Comendador Miguel Calfat, 410 - Vila Nova Conceição, São Paulo - SP, 04537-081",
      "city": "SAO PAULO",
      "neighborhood": "Vila Nova Conceição",
      "foodType": "FITNESS",
      "menu": "https://isabelaakkari.com/menu",
      "occasion": "BRUNCH",
      "type": "FITNESS",
      "status": "PENDING",
      "reservation": "NAO",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "SAINT DECOR",
      "address": "Rua Padre Landell de Moura, 152 - Jardim Analia Franco, São Paulo - SP, 03337-080",
      "city": "SAO PAULO",
      "neighborhood": "Jardim Analia Franco",
      "foodType": "BRUNCH",
      "menu": "https://www.instagram.com/saintdecorbistro/",
      "occasion": "BRUNCH",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "NAO",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "BARBACOA  - MORUMBI ",
      "address": "Morumbi Shopping - Piso Lazer - Av. Roque Petroni Júnior, 1089 - Chácara Santo Antônio (Zona Sul), São Paulo - SP, 04707-120",
      "city": "SAO PAULO",
      "neighborhood": "MORUMBI",
      "foodType": "CARNE",
      "menu": "Indisponivel",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "RESTAURANTE HANNOVER",
      "address": "Av. Cotovia, 445",
      "city": "SAO PAULO",
      "neighborhood": "MOEMA",
      "foodType": "FONDUE",
      "menu": "https://restaurantehannover.com.br/cardapio/",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "DONA JOANNA ESPAÇO GOURMET ",
      "address": "R. Olávo Gonçalves, 257 - Vila Goncalves, São Bernardo do Campo",
      "city": "SAO BERNARDO DO CAMPO",
      "neighborhood": "Vila Goncalves",
      "foodType": "CARNE",
      "menu": "https://dguests.com/cardapio/DONAJOANNA",
      "occasion": "NORMAL",
      "type": "NORMAL",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "MIRÓ GASTRONOMIA",
      "address": "Alameda Lorena, 2101 - Jardim Paulista, São Paulo - SP, 01424-007",
      "city": "SAO PAULO",
      "neighborhood": "Jardim Paulista",
      "foodType": "INTERNACIONAL",
      "menu": "https://livemenu.app/menu/61c4c663aa455a0012eaf914",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "ALL SEASONS RESTAURANTE",
      "address": "Alameda Santos, 85 - Jardins, São Paulo - SP, 01419-000",
      "city": "SAO PAULO",
      "neighborhood": "JARDINS",
      "foodType": "INTERNACIONAL",
      "menu": "https://www.restauranteallseasons.com.br/?page_id=2979%20e%20https://www.restauranteallseasons.com.br/?page_id=2998",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "VERIDIANA",
      "address": "Rua José Maria Lisboa, 493 - Jardins        São Paulo-SP\n\t• CEP 01423-001 https://www.google.com/maps?ll=-23.569179,-46.657201&z=17&t=m&hl=pt-BR&gl=BR&mapclient=embed&cid=13056816066231540078\n\t• http://www.veridiana.com.br/contato\n\t• https://www.google.com/maps/@-23.5690543,-46.6570955,0a,82.2y,237.13h,96.1t/data=!3m4!1e1!3m2!1sAF1QipN6CnKe2BSy4XxVT3Fp6S8lyf_PgH3M17lCpA1V!2e10?source=apiv3",
      "city": "SAO PAULO",
      "neighborhood": "JARDINS",
      "foodType": "PIZZA",
      "menu": "https://www.veridiana.com.br/cardapio",
      "occasion": "NORMAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "Nico Pasta & Pasta",
      "address": "Rua Costa Aguiar, 1586 - Ipiranga, São Paulo - SP, 04204-001",
      "city": "SAO PAULO",
      "neighborhood": "IPIRANGA",
      "foodType": "ITALIANA",
      "menu": "https://www.nicopastabasta.com.br/menu",
      "occasion": "NORMAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "ALTRUISTA OSTERIA E ENOTECA",
      "address": "Alameda Campinas, 952 - Jardins, São Paulo - SP, 01404-200",
      "city": "SAO PAULO",
      "neighborhood": "JARDINS",
      "foodType": "ITALIANA",
      "menu": "https://altruistasp.com.br/",
      "occasion": "NORMAL",
      "type": "NORMAL",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "Ôpa",
      "address": "R. Eng. Gustavo Kaiser, 165 Vila Natal, Campos do Jordão, Estado de São Paulo 12460-000 Brasil",
      "city": "CAMPOS DO JORDAO",
      "neighborhood": "Vila Natal",
      "foodType": "PIZZA",
      "menu": "https://www.tripadvisor.com.br/Restaurant_Review-g303607-d23462265-Reviews-Opa-Campos_Do_Jordao_State_of_Sao_Paulo.html",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "NAO",
      "region": "INTERIOR",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "STEAK BIFE ERICK JACQUIN ",
      "address": "Av. Rebouças, 2636 - Pinheiros, São Paulo - SP, 05402-400",
      "city": "SAO PAULO",
      "neighborhood": "PINHEIROS",
      "foodType": "CARNE",
      "menu": "https://restaurantguru.com/Steak-Bife-Erick-Jacquin-Sao-Paulo/menu",
      "occasion": "NORMAL",
      "type": "NORMAL",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "NB STEAK",
      "address": "Av. Brigadeiro Faria Lima, 140\n\tPinheiros - São Paulo/SP",
      "city": "SAO PAULO",
      "neighborhood": "FARIA LIMA",
      "foodType": "CARNE, RODIZIO",
      "menu": "https://www.nbsteak.com.br/menu",
      "occasion": "NORMAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "VARANDA JARDINS ",
      "address": "Varanda Jardins\n\tRua General Mena Barreto, 793\n\tJardim Paulista – São Paulo/SP\n\tFone: (11) 3887-8870\n\t\n\tVaranda JK Iguatemi\n\tAv. Pres. Juscelino Kubitschek, 2041\n\tShopping JK Iguatemi – Lj. 321B\n\tPiso 2- Itaim Bibi – São Paulo/SP\n\tFone: (11) 3152-6777\n\t\n\tVaranda Faria Lima\n\tRua Prudente Correia, 432\n\tJardim Europa – São Paulo/SP\n\tFone: (11) 3039-6500",
      "city": "SAO PAULO",
      "neighborhood": "FARIA LIMA, IGUATEMI, JARDINS",
      "foodType": "CARNE",
      "menu": "https://varandagrill.com.br/pt/cardapio-2/",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "TORDESILHAS ",
      "address": "Alameda Tietê, 489 - Jardins, São Paulo - SP, 01417-020",
      "city": "SAO PAULO",
      "neighborhood": "JARDINS",
      "foodType": "MINEIRA",
      "menu": "https://www.tordesilhas.com/cardapio",
      "occasion": "NORMAL",
      "type": "NORMAL",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "Küche",
      "address": "Rua Engenheiro Gustavo Kaiser, 165 Jaguaribe, Campos do Jordão, Estado de São Paulo 12460-000 Brasil",
      "city": "CAMPOS DO JORDAO",
      "neighborhood": "Jaguaribe",
      "foodType": "INTERNACIONAL",
      "menu": "https://www.tripadvisor.com.br/Restaurant_Review-g303607-d21370349-Reviews-Kuche-Campos_Do_Jordao_State_of_Sao_Paulo.html",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "NAO",
      "region": "INTERIOR",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "Restaurante Libertango",
      "address": "Av. José Manoel Gonçalves, 160 Atras da Igreja São Benedito, Campos do Jordão, Estado de São Paulo 12460-000 Brasil",
      "city": "CAMPOS DO JORDAO",
      "neighborhood": "Centro",
      "foodType": "CARNE",
      "menu": "https://libertango.com.br/menu.pdf",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "INTERIOR",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "Restaurante Por Do Sol Parrilla Grill",
      "address": "Rua Marte, 105 Restaurante, Campos do Jordão, Estado de São Paulo 12460-000 Brasil",
      "city": "CAMPOS DO JORDAO",
      "neighborhood": "VILA SIOMARA",
      "foodType": "CARNE",
      "menu": "https://www.instagram.com/pordosolparrillagrill/?igshid=ymmymta2m2y%3D",
      "occasion": "ESPECIAL",
      "type": "NORMAL",
      "status": "PENDING",
      "reservation": "NAO",
      "region": "INTERIOR",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "Ouesushi",
      "address": "inserir endereco",
      "city": "SAO PAULO",
      "neighborhood": "JARDINS",
      "foodType": "JAPA",
      "menu": "",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "SAL GASTRONOMIA",
      "address": "Shopping Cidade Jardim",
      "city": "SAO PAULO",
      "neighborhood": "CIdade Jardim",
      "foodType": "BRASILEIRA",
      "menu": "https://salgastronomia.com.br/cardapio/",
      "occasion": "NORMAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "L'Osteria Villa Casato por chef Ajax Cavenaghi",
      "address": "Rua Andre Kotchkoff 297 Capivari, Campos do Jordão, Estado de São Paulo 12460-000 Brasil",
      "city": "CAMPOS DO JORDAO",
      "neighborhood": "Centro",
      "foodType": "EUROPEIA, ITALIANA",
      "menu": "https://www.villacasato.com.br/losteria-villa-casato.php",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "INTERIOR",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "Confraria Do Sabor",
      "address": "https://www.tripadvisor.com.br/Restaurant_Review-g303607-d2427148-Reviews-Confraria_do_Sabor-Campos_Do_Jordao_State_of_Sao_Paulo.html#MAPVIEW",
      "city": "CAMPOS DO JORDAO",
      "neighborhood": "Centro",
      "foodType": "BRASILEIRA, FRANCESA, ITALIANA",
      "menu": "https://confrariadosabor.com.br/#menu",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "INTERIOR",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "Le Foyer",
      "address": "https://www.tripadvisor.com.br/Restaurant_Review-g303607-d2427160-Reviews-Le_Foyer-Campos_Do_Jordao_State_of_Sao_Paulo.html#MAPVIEW",
      "city": "CAMPOS DO JORDAO",
      "neighborhood": "Centro",
      "foodType": "FRANCESA, INTERNACIONAL, SUICA",
      "menu": "https://irp.cdn-website.com/78d9054e/files/uploaded/CARDAPIO_DIGITAL_LE_FOYER_2023%20(3).pdf%20NOVO.pdf",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "INTERIOR",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    },
    {
      "name": "Picchi",
      "address": "rua oscar freire, 533 – cerqueira césarsão paulo – sp, 01426-001",
      "city": "SAO PAULO",
      "neighborhood": "OSCAR FREIRE",
      "foodType": "ITALIANA",
      "menu": "https://restaurantepicchi.com.br/wp-content/uploads/2024/03/COMIDA-MARCO-2024-PICCHI-.pdf",
      "occasion": "ESPECIAL",
      "type": "SOFISTICADO",
      "status": "PENDING",
      "reservation": "SIM",
      "region": "SUDESTE",
      "state": "SAO PAULO",
      "priority": "TEMPLATE"
    }
  ];

  const [selectedFoodType, setSelectedFoodType] = useState('Todos');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Todos');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedCity, setSelectedCity] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique values for filters
  const foodTypes = ['Todos', ...new Set(restaurantsData.map(r => r.foodType).filter(Boolean))];
  const neighborhoods = ['Todos', ...new Set(restaurantsData.map(r => r.neighborhood).filter(Boolean))];
  const types = ['Todos', ...new Set(restaurantsData.map(r => r.type).filter(Boolean))];
  const cities = ['Todos', ...new Set(restaurantsData.map(r => r.city).filter(Boolean))];

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurantsData.filter(restaurant => {
      const matchesFoodType = selectedFoodType === 'Todos' || restaurant.foodType === selectedFoodType;
      const matchesNeighborhood = selectedNeighborhood === 'Todos' || restaurant.neighborhood === selectedNeighborhood;
      const matchesType = selectedType === 'Todos' || restaurant.type === selectedType;
      const matchesCity = selectedCity === 'Todos' || restaurant.city === selectedCity;
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesFoodType && matchesNeighborhood && matchesType && matchesCity && matchesSearch;
    });
  }, [selectedFoodType, selectedNeighborhood, selectedType, selectedCity, searchTerm]);

  const stats = {
    total: restaurantsData.length,
    visited: restaurantsData.filter(r => r.status === 'FOMOS').length,
    pending: restaurantsData.filter(r => r.status === 'PENDING').length,
    withReservation: restaurantsData.filter(r => r.reservation === 'SIM').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <ChefHat className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Guia de Restaurantes Brasil</h1>
          </div>
          <p className="text-orange-100">Seus restaurantes favoritos em um só lugar</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="text-3xl font-bold text-orange-600">{stats.total}</div>
            <div className="text-gray-600 text-sm">Total Restaurantes</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-3xl font-bold text-green-600">{stats.visited}</div>
            <div className="text-gray-600 text-sm">Já Visitados</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-blue-600">{stats.pending}</div>
            <div className="text-gray-600 text-sm">Para Visitar</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="text-3xl font-bold text-purple-600">{stats.withReservation}</div>
            <div className="text-gray-600 text-sm">Aceitam Reserva</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Buscar restaurante..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Comida</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedFoodType}
                onChange={(e) => setSelectedFoodType(e.target.value)}
              >
                {foodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
              >
                {neighborhoods.map(neighborhood => (
                  <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Mostrando <span className="font-bold text-orange-600">{filteredRestaurants.length}</span> restaurante(s)
          </p>
        </div>

        {/* Restaurant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
              {/* Header Color Bar */}
              <div className={`h-2 ${restaurant.type === 'SOFISTICADO' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : restaurant.type === 'FITNESS' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-orange-500 to-red-500'}`}></div>
              
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{restaurant.name}</h3>
                
                {/* Food Type Badge */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                    <Utensils className="w-3 h-3 mr-1" />
                    {restaurant.foodType}
                  </span>
                  {restaurant.type && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      restaurant.type === 'SOFISTICADO' ? 'bg-purple-100 text-purple-800' :
                      restaurant.type === 'FITNESS' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {restaurant.type}
                    </span>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-red-500" />
                  <div className="text-sm">
                    <div className="font-medium">{restaurant.neighborhood}</div>
                    <div className="text-xs text-gray-500">{restaurant.city}</div>
                  </div>
                </div>

                {/* Occasion */}
                {restaurant.occasion && (
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{restaurant.occasion}</span>
                  </div>
                )}

                {/* Reservation Badge */}
                {restaurant.reservation === 'SIM' && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Star className="w-3 h-3 mr-1" />
                      Aceita Reserva
                    </span>
                  </div>
                )}

                {/* Priority Badge */}
                {restaurant.priority === 'HIGH' && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      🔥 Alta Prioridade
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  {restaurant.menu && restaurant.menu !== 'Indisponivel' && (
                    <a
                      href={restaurant.menu}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                    >
                      Ver Cardápio
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum restaurante encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou a busca</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">Dashboard criado com ❤️ para descobrir os melhores restaurantes</p>
          <p className="text-sm text-gray-500 mt-2">Total: {stats.total} restaurantes • Última atualização: Janeiro 2026</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;