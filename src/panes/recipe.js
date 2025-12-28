/**
 * Schema.org Recipe Pane
 * Beautiful rendering of schema:Recipe
 */

(function() {
'use strict';

const SCHEMA = $rdf.Namespace('http://schema.org/')

const recipePane = {
  name: 'schemaRecipe',

  icon: $rdf.sym('https://solid-lite.github.io/schemapanes/icons/recipe.svg'),

  label: function(subject, context) {
    const store = context.session.store
    const dominated = context.dom.querySelector('.schema-recipe-pane')
    if (dominated) return null

    const types = store.findTypeURIs(subject)
    if (types[SCHEMA('Recipe').uri]) {
      return 'Recipe'
    }
    return null
  },

  render: function(subject, context) {
    const store = context.session.store
    const dom = context.dom

    const div = dom.createElement('div')
    div.className = 'schema-recipe-pane'
    div.style.cssText = 'font-family: system-ui, sans-serif; padding: 20px; max-width: 700px;'

    // Get properties
    const name = store.anyValue(subject, SCHEMA('name'))
    const description = store.anyValue(subject, SCHEMA('description'))
    const image = store.any(subject, SCHEMA('image'))
    const prepTime = store.anyValue(subject, SCHEMA('prepTime'))
    const cookTime = store.anyValue(subject, SCHEMA('cookTime'))
    const totalTime = store.anyValue(subject, SCHEMA('totalTime'))
    const recipeYield = store.anyValue(subject, SCHEMA('recipeYield'))
    const category = store.anyValue(subject, SCHEMA('recipeCategory'))
    const cuisine = store.anyValue(subject, SCHEMA('recipeCuisine'))
    const ingredients = store.each(subject, SCHEMA('recipeIngredient'))

    // Build card
    const card = dom.createElement('div')
    card.style.cssText = 'background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);'

    // Image header
    if (image) {
      const img = dom.createElement('img')
      img.src = image.uri || image.value
      img.style.cssText = 'width: 100%; height: 250px; object-fit: cover;'
      card.appendChild(img)
    }

    // Content
    const content = dom.createElement('div')
    content.style.cssText = 'padding: 24px;'

    if (name) {
      const h2 = dom.createElement('h2')
      h2.textContent = name
      h2.style.cssText = 'margin: 0 0 8px 0; color: #1e293b;'
      content.appendChild(h2)
    }

    // Meta row
    const meta = dom.createElement('div')
    meta.style.cssText = 'display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap;'

    function formatDuration(iso) {
      if (!iso) return null
      const match = iso.match(/PT(\d+H)?(\d+M)?/)
      if (!match) return iso
      const hours = match[1] ? parseInt(match[1]) + 'h ' : ''
      const mins = match[2] ? parseInt(match[2]) + 'm' : ''
      return hours + mins
    }

    if (prepTime) {
      const span = dom.createElement('span')
      span.innerHTML = '⏱️ Prep: ' + formatDuration(prepTime)
      span.style.cssText = 'color: #64748b; font-size: 0.9em;'
      meta.appendChild(span)
    }

    if (cookTime) {
      const span = dom.createElement('span')
      span.innerHTML = '🍳 Cook: ' + formatDuration(cookTime)
      span.style.cssText = 'color: #64748b; font-size: 0.9em;'
      meta.appendChild(span)
    }

    if (recipeYield) {
      const span = dom.createElement('span')
      span.innerHTML = '🍽️ ' + recipeYield
      span.style.cssText = 'color: #64748b; font-size: 0.9em;'
      meta.appendChild(span)
    }

    content.appendChild(meta)

    // Tags
    if (category || cuisine) {
      const tags = dom.createElement('div')
      tags.style.cssText = 'display: flex; gap: 8px; margin-bottom: 16px;'

      if (category) {
        const tag = dom.createElement('span')
        tag.textContent = category
        tag.style.cssText = 'background: #f0fdf4; color: #166534; padding: 4px 12px; border-radius: 9999px; font-size: 0.85em;'
        tags.appendChild(tag)
      }

      if (cuisine) {
        const tag = dom.createElement('span')
        tag.textContent = cuisine
        tag.style.cssText = 'background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 9999px; font-size: 0.85em;'
        tags.appendChild(tag)
      }

      content.appendChild(tags)
    }

    if (description) {
      const p = dom.createElement('p')
      p.textContent = description
      p.style.cssText = 'margin: 0 0 16px 0; color: #64748b;'
      content.appendChild(p)
    }

    // Ingredients
    if (ingredients.length > 0) {
      const h3 = dom.createElement('h3')
      h3.textContent = 'Ingredients'
      h3.style.cssText = 'margin: 0 0 12px 0; color: #1e293b; font-size: 1.1em;'
      content.appendChild(h3)

      const ul = dom.createElement('ul')
      ul.style.cssText = 'margin: 0; padding-left: 20px; color: #475569;'

      ingredients.forEach(ing => {
        const li = dom.createElement('li')
        li.textContent = ing.value
        li.style.cssText = 'margin-bottom: 4px;'
        ul.appendChild(li)
      })

      content.appendChild(ul)
    }

    card.appendChild(content)
    div.appendChild(card)

    return div
  }
}

// Register with panes
if (typeof panes !== 'undefined' && panes.register) {
  panes.register(recipePane)
}

// Export
if (typeof window !== 'undefined') {
  window.SchemaRecipePane = recipePane
}

})();
