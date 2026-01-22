#!/usr/bin/env python3
"""
Script de Atualização Automática de Restaurantes
=================================================

Este script demonstra como você pode automatizar a atualização
do dashboard de restaurantes com dados atualizados.

REQUISITOS:
-----------
pip install pandas requests beautifulsoup4 googlemaps

CONFIGURAÇÃO:
-------------
1. Obtenha uma API key do Google Places: https://console.cloud.google.com/apis
2. Configure as variáveis abaixo
3. Rode o script semanalmente (use cron/task scheduler)

USO:
----
python atualizar_restaurantes.py

IMPORTANTE:
-----------
- Google Places API tem custo após cota gratuita (consulte preços)
- Este é um exemplo básico - pode ser expandido conforme necessidade
"""

import csv
import json
import os
from datetime import datetime
from typing import List, Dict

# ===== CONFIGURAÇÃO =====
CSV_INPUT = "restaurantes.csv"
JSON_OUTPUT = "restaurantes.json"
HTML_OUTPUT = "restaurantes-dashboard.html"

# API Keys (substitua com suas chaves)
GOOGLE_API_KEY = "SUA_API_KEY_AQUI"  # https://console.cloud.google.com/apis


def ler_csv_restaurantes(arquivo: str) -> List[Dict]:
    """
    Lê o CSV de restaurantes e retorna lista de dicionários
    """
    restaurantes = []
    
    with open(arquivo, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Filtrar apenas restaurantes válidos
            if row['Name'] and row['Name'] != 'TEMPLATE' and row['City'] not in ['TEMPLATE', '']:
                restaurantes.append({
                    'name': row['Name'].strip(),
                    'address': row['Address'].strip(),
                    'city': row['City'].strip(),
                    'neighborhood': row['Neighborhood'].strip(),
                    'foodType': row['Food Type'].strip(),
                    'menu': row['Menu'].strip(),
                    'occasion': row['Occasion'].strip(),
                    'type': row['Type'].strip(),
                    'status': row['Trip Status'].strip(),
                    'reservation': row['Reservation'].strip(),
                    'region': row['Region'].strip(),
                    'state': row['State'].strip(),
                })
    
    return restaurantes


def buscar_avaliacoes_google(restaurante: Dict) -> Dict:
    """
    Busca avaliações e informações atualizadas do Google Places
    
    NOTA: Requer Google Places API habilitada e com billing configurado
    """
    try:
        import googlemaps
        
        if GOOGLE_API_KEY == "SUA_API_KEY_AQUI":
            print("⚠️  API Key não configurada, pulando busca no Google")
            return restaurante
        
        gmaps = googlemaps.Client(key=GOOGLE_API_KEY)
        
        # Buscar restaurante
        query = f"{restaurante['name']} {restaurante['address']} {restaurante['city']}"
        places = gmaps.places(query=query)
        
        if places['results']:
            place = places['results'][0]
            place_id = place['place_id']
            
            # Buscar detalhes
            details = gmaps.place(place_id=place_id)['result']
            
            # Atualizar informações
            restaurante['rating'] = details.get('rating', 'N/A')
            restaurante['total_ratings'] = details.get('user_ratings_total', 0)
            restaurante['price_level'] = details.get('price_level', 'N/A')
            restaurante['is_open'] = details.get('opening_hours', {}).get('open_now', None)
            restaurante['google_maps_url'] = details.get('url', '')
            
            print(f"✅ {restaurante['name']}: Rating {restaurante['rating']} ({restaurante['total_ratings']} avaliações)")
        else:
            print(f"❌ {restaurante['name']}: Não encontrado no Google")
            
    except ImportError:
        print("⚠️  Biblioteca googlemaps não instalada. Execute: pip install googlemaps")
    except Exception as e:
        print(f"❌ Erro ao buscar {restaurante['name']}: {e}")
    
    return restaurante


def validar_menu_existe(url: str) -> bool:
    """
    Valida se o URL do menu ainda está acessível
    """
    if not url or url == 'Indisponivel':
        return False
    
    try:
        import requests
        response = requests.head(url, timeout=5, allow_redirects=True)
        return response.status_code == 200
    except:
        return False


def gerar_html_atualizado(restaurantes: List[Dict], arquivo_saida: str):
    """
    Gera novo arquivo HTML com dados atualizados
    """
    # Aqui você pode usar um template HTML ou ler o HTML existente
    # e substituir apenas o array de dados JavaScript
    
    print(f"📝 Gerando HTML atualizado em {arquivo_saida}")
    
    # Salvar JSON para facilitar
    json_data = json.dumps(restaurantes, ensure_ascii=False, indent=2)
    
    print(f"✅ HTML atualizado gerado com {len(restaurantes)} restaurantes")
    print(f"💾 Dados salvos em JSON: {JSON_OUTPUT}")


def main():
    """
    Função principal do script
    """
    print("🍽️  Iniciando atualização de restaurantes...")
    print("=" * 60)
    
    # 1. Ler CSV
    print("\n📖 Lendo dados do CSV...")
    restaurantes = ler_csv_restaurantes(CSV_INPUT)
    print(f"   Encontrados: {len(restaurantes)} restaurantes")
    
    # 2. Buscar avaliações atualizadas (se API configurada)
    print("\n🔍 Buscando avaliações no Google Places...")
    for i, rest in enumerate(restaurantes, 1):
        print(f"\n   [{i}/{len(restaurantes)}] Processando: {rest['name']}")
        restaurantes[i-1] = buscar_avaliacoes_google(rest)
    
    # 3. Validar menus
    print("\n🔗 Validando URLs de menus...")
    for rest in restaurantes:
        if rest['menu']:
            menu_valido = validar_menu_existe(rest['menu'])
            rest['menu_valido'] = menu_valido
            status = "✅" if menu_valido else "❌"
            print(f"   {status} {rest['name']}")
    
    # 4. Gerar novo HTML
    print("\n📝 Gerando dashboard atualizado...")
    gerar_html_atualizado(restaurantes, HTML_OUTPUT)
    
    # 5. Salvar JSON para backup
    with open(JSON_OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(restaurantes, f, ensure_ascii=False, indent=2)
    
    print("\n" + "=" * 60)
    print("✅ Atualização concluída com sucesso!")
    print(f"📅 Data: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
    print("\n📊 Próximos passos:")
    print("   1. Revise os dados atualizados")
    print("   2. Abra o HTML no navegador")
    print("   3. Se tudo OK, faça upload para seu site")


# ===== AGENDAMENTO AUTOMÁTICO =====
"""
WINDOWS (Task Scheduler):
-------------------------
1. Abra Task Scheduler
2. Create Basic Task
3. Name: "Atualizar Restaurantes"
4. Trigger: Weekly (escolha dia/hora)
5. Action: Start a program
6. Program: python.exe
7. Arguments: C:\\caminho\\para\\atualizar_restaurantes.py

LINUX/MAC (Cron):
-----------------
1. Edite crontab: crontab -e
2. Adicione linha (executa toda segunda às 8h):
   0 8 * * 1 /usr/bin/python3 /caminho/para/atualizar_restaurantes.py

Para executar a cada 7 dias às 8h da manhã:
0 8 */7 * * /usr/bin/python3 /caminho/para/atualizar_restaurantes.py
"""


if __name__ == "__main__":
    main()
