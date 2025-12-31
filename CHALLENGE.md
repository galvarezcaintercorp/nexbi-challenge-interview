# Desafío Técnico - Gestor de Pokémon

## 📋 Contexto

Bienvenido al desafío técnico de desarrollo frontend Nexbi. En este ejercicio trabajarás con una aplicación Angular que permite a un entrenador Pokémon gestionar su colección de criaturas capturadas.

## 🎯 Objetivo

Mejorar, completar y optimizar una aplicación de gestión de Pokémon, aplicando las mejores prácticas de Angular y demostrando tus habilidades en el desarrollo de aplicaciones web modernas.

## 🛠️ Tecnologías

- **Angular**: v17
- **Angular Material**: Para componentes UI
- **Jasmine & Karma**: Para pruebas unitarias
- **TypeScript**: Lenguaje principal
- **RxJS**: Para programación reactiva

## 🔌 API a Utilizar

El proyecto debe consumir la **PokeAPI** (API pública de Pokémon):

- **Base URL**: `https://pokeapi.co/api/v2/`
- **Documentación**: https://pokeapi.co/docs/v2

### Endpoints Relevantes:

- **Pokédex completa**: `GET /pokemon?limit=100000&offset=0` - Lista de todos los Pokémon disponibles
- **Detalle de Pokémon**: `GET /pokemon/{id o nombre}` - Información detallada de un Pokémon específico
- **Tipos de Pokémon**: `GET /type` - Lista de tipos disponibles

### Flujo de la Aplicación:

1. **Pokédex (API)**: Lista de TODOS los Pokémon disponibles que pueden ser capturados
2. **Capturados (Local)**: Lista personal del entrenador con Pokémon que ha capturado

**Importante**: 
- La **lista de capturados** NO se obtiene de la API, se gestiona localmente
- Para añadir un Pokémon, primero se busca en la Pokédex (API)
- Luego se añade a la lista de capturados con información adicional
- Deberás implementar **adaptadores/mappers** para transformar los datos de la API

### Estructura de Datos

#### Modelo de Dominio (Pokémon Capturado)

```typescript
interface CapturedPokemon {
  id: number;                    // ID único de la captura (autogenerado)
  pokemonId: number;             // ID del Pokémon en la Pokédex
  name: string;
  type: string[];
  image: string;
  hp: number;
  attack: number;
  defense: number;
  
  // Datos adicionales de captura
  captureDate: Date;             // Fecha de captura
  captureLocation: string;       // Lugar donde fue capturado (ej: "Bosque Verde")
  pokeballType: string;          // Tipo de Pokeball usada (ej: "Pokeball", "Superball", "Ultraball")
  level: number;                 // Nivel al ser capturado (1-100)
  nickname?: string;             // Apodo opcional
  description?: string;          // Descripción o notas del entrenador
}
```

#### Respuesta de la API (PokeAPI)

La respuesta de PokeAPI es extensa y contiene muchos campos. Consulta la [documentación oficial](https://pokeapi.co/docs/v2#pokemon) para ver la estructura completa.

**Ejemplo de respuesta**: `GET https://pokeapi.co/api/v2/pokemon/35` (Clefairy)

```json
{
  "id": 35,
  "name": "clefairy",
  "height": 6,
  "weight": 75,
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "fairy",
        "url": "https://pokeapi.co/api/v2/type/18/"
      }
    }
  ],
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
    "other": {
      "official-artwork": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png"
      }
    }
  },
  "stats": [
    {"base_stat": 70, "stat": {"name": "hp"}},
    {"base_stat": 45, "stat": {"name": "attack"}},
    {"base_stat": 48, "stat": {"name": "defense"}},
    {"base_stat": 60, "stat": {"name": "special-attack"}},
    {"base_stat": 65, "stat": {"name": "special-defense"}},
    {"base_stat": 35, "stat": {"name": "speed"}}
  ],
  "abilities": [...],
  "moves": [...],
  // ... muchos otros campos
}
```

**📌 Requisito Clave**: Debes crear **interfaces TypeScript** para tipar las respuestas de la API e implementar **adaptadores/mappers** para convertir los datos de la API al modelo `CapturedPokemon` de tu aplicación, extrayendo solo los campos necesarios.

## 📝 Tareas a Implementar

### 1. Vista de Detalle de Pokémon (Obligatorio)

**Requisitos:**
- Crear un componente de detalle que muestre toda la información de un Pokémon
- Implementar la navegación desde la lista hacia el detalle
- Mostrar todos los atributos del Pokémon
- Incluir un botón para volver a la lista

**Ruta esperada:** `/pokemon/:id`

### 2. Página de Error 404 (Obligatorio)

**Requisitos:**
- Crear un componente para error 404
- Mostrar esta página cuando se intente acceder a un Pokémon que no existe
- Incluir un botón o enlace para volver a la lista principal

**Ejemplo:** Si se intenta acceder a `/pokemon/999` y ese ID no existe, mostrar la página 404

### 3. Funcionalidad: Añadir validaciones al formulario de captura (Obligatorio)

### 4. Arquitectura y Organización del Código (Obligatorio)

**Este es uno de los aspectos más importantes del desafío.** Debes demostrar tu capacidad para organizar código en capas bien definidas.

Este desafío está diseñado para evaluar tus habilidades técnicas, capacidad de resolución de problemas y conocimiento de las mejores prácticas de Angular. 

**No se espera perfección**, pero sí un trabajo profesional y bien pensado.

**¡Buena suerte!** 🍀

---

**Fecha de emisión**: Diciembre 2025  
**Versión**: 1.0
