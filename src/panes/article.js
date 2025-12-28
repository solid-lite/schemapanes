/**
 * Schema.org Article Pane
 * Beautiful rendering of schema:Article
 */

(function() {
'use strict';

const SCHEMA = $rdf.Namespace('http://schema.org/')

const articlePane = {
  name: 'schemaArticle',

  icon: $rdf.sym('https://solid-lite.github.io/schemapanes/icons/article.svg'),

  label: function(subject, context) {
    const store = context.session.store
    const dominated = context.dom.querySelector('.schema-article-pane')
    if (dominated) return null

    const types = store.findTypeURIs(subject)
    if (types[SCHEMA('Article').uri] || types[SCHEMA('BlogPosting').uri] || types[SCHEMA('NewsArticle').uri]) {
      return 'Article'
    }
    return null
  },

  render: function(subject, context) {
    const store = context.session.store
    const dom = context.dom

    const div = dom.createElement('div')
    div.className = 'schema-article-pane'
    div.style.cssText = 'font-family: system-ui, sans-serif; padding: 20px; max-width: 700px;'

    // Get properties
    const headline = store.anyValue(subject, SCHEMA('headline')) || store.anyValue(subject, SCHEMA('name'))
    const description = store.anyValue(subject, SCHEMA('description'))
    const articleBody = store.anyValue(subject, SCHEMA('articleBody'))
    const datePublished = store.anyValue(subject, SCHEMA('datePublished'))
    const dateModified = store.anyValue(subject, SCHEMA('dateModified'))
    const author = store.any(subject, SCHEMA('author'))
    const publisher = store.any(subject, SCHEMA('publisher'))
    const keywords = store.anyValue(subject, SCHEMA('keywords'))
    const url = store.any(subject, SCHEMA('url'))

    // Build article
    const article = dom.createElement('article')
    article.style.cssText = 'background: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);'

    // Header
    if (headline) {
      const h1 = dom.createElement('h1')
      h1.textContent = headline
      h1.style.cssText = 'margin: 0 0 16px 0; color: #1e293b; font-size: 1.8em; line-height: 1.3;'
      article.appendChild(h1)
    }

    // Meta
    const meta = dom.createElement('div')
    meta.style.cssText = 'display: flex; gap: 16px; align-items: center; margin-bottom: 20px; flex-wrap: wrap; color: #64748b; font-size: 0.9em;'

    if (author) {
      const authorName = store.anyValue(author, SCHEMA('name'))
      if (authorName) {
        const span = dom.createElement('span')
        span.innerHTML = '✍️ ' + authorName
        meta.appendChild(span)
      }
    }

    if (datePublished) {
      const span = dom.createElement('span')
      const date = new Date(datePublished)
      span.innerHTML = '📅 ' + date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      meta.appendChild(span)
    }

    if (publisher) {
      const pubName = store.anyValue(publisher, SCHEMA('name'))
      if (pubName) {
        const span = dom.createElement('span')
        span.innerHTML = '📰 ' + pubName
        meta.appendChild(span)
      }
    }

    article.appendChild(meta)

    // Keywords/tags
    if (keywords) {
      const tags = dom.createElement('div')
      tags.style.cssText = 'display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;'

      keywords.split(',').forEach(keyword => {
        const tag = dom.createElement('span')
        tag.textContent = keyword.trim()
        tag.style.cssText = 'background: #eff6ff; color: #1d4ed8; padding: 4px 12px; border-radius: 9999px; font-size: 0.85em;'
        tags.appendChild(tag)
      })

      article.appendChild(tags)
    }

    // Description
    if (description) {
      const lead = dom.createElement('p')
      lead.textContent = description
      lead.style.cssText = 'margin: 0 0 20px 0; color: #475569; font-size: 1.1em; font-style: italic; border-left: 3px solid #cbd5e1; padding-left: 16px;'
      article.appendChild(lead)
    }

    // Body
    if (articleBody) {
      const body = dom.createElement('div')
      body.style.cssText = 'color: #334155; line-height: 1.7;'

      // Split into paragraphs
      articleBody.split('\n\n').forEach(para => {
        const p = dom.createElement('p')
        p.textContent = para
        p.style.cssText = 'margin: 0 0 16px 0;'
        body.appendChild(p)
      })

      article.appendChild(body)
    }

    // Link
    if (url) {
      const link = dom.createElement('a')
      link.href = url.uri || url.value
      link.textContent = 'Read full article →'
      link.style.cssText = 'display: inline-block; margin-top: 16px; color: #2563eb; text-decoration: none; font-weight: 500;'
      article.appendChild(link)
    }

    div.appendChild(article)

    return div
  }
}

// Register with panes
if (typeof panes !== 'undefined' && panes.register) {
  panes.register(articlePane)
}

// Export
if (typeof window !== 'undefined') {
  window.SchemaArticlePane = articlePane
}

})();
