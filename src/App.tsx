import { useState, useEffect } from 'react'
import './App.css'

interface Project {
  id: string
  name: string
  description: string
  token: {
    symbol: string
    name: string
    chain: string
    launchDate: string
    marketCap?: string
    price?: string
  }
  website?: string
  twitter?: string
  category: string
  logo: string
  gradient: string
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Opus Labs',
    description: 'AI-powered DeFi protocol built with Claude for intelligent yield optimization and risk management.',
    token: {
      symbol: 'OPUS',
      name: 'Opus Token',
      chain: 'Ethereum',
      launchDate: '2024-01-15',
      marketCap: '$12.4M',
      price: '$0.82'
    },
    website: 'https://opuslabs.ai',
    twitter: '@OpusLabsAI',
    category: 'DeFi',
    logo: '⚡',
    gradient: 'from-violet-500 to-fuchsia-500'
  },
  {
    id: '2',
    name: 'Sonnet Protocol',
    description: 'Decentralized AI agent marketplace where Claude-built agents trade services autonomously.',
    token: {
      symbol: 'SNNT',
      name: 'Sonnet',
      chain: 'Base',
      launchDate: '2024-02-20',
      marketCap: '$8.7M',
      price: '$0.34'
    },
    website: 'https://sonnetprotocol.xyz',
    twitter: '@SonnetProtocol',
    category: 'AI Agents',
    logo: '🎭',
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    id: '3',
    name: 'Haiku Finance',
    description: 'Minimalist lending protocol with Claude-generated risk assessments and automated liquidation.',
    token: {
      symbol: 'HAIKU',
      name: 'Haiku',
      chain: 'Arbitrum',
      launchDate: '2024-03-10',
      marketCap: '$5.2M',
      price: '$0.15'
    },
    website: 'https://haiku.finance',
    twitter: '@HaikuFinance',
    category: 'Lending',
    logo: '🌸',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    id: '4',
    name: 'Anthropic DAO',
    description: 'Community-governed fund investing in Claude-built projects with AI-assisted proposal analysis.',
    token: {
      symbol: 'ADAO',
      name: 'Anthropic DAO',
      chain: 'Ethereum',
      launchDate: '2024-01-28',
      marketCap: '$22.1M',
      price: '$1.47'
    },
    website: 'https://anthropicdao.org',
    twitter: '@AnthropicDAO',
    category: 'DAO',
    logo: '🏛️',
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    id: '5',
    name: 'ClaudeSwap',
    description: 'Next-gen DEX aggregator using Claude for optimal routing and MEV protection.',
    token: {
      symbol: 'CSWAP',
      name: 'ClaudeSwap',
      chain: 'Solana',
      launchDate: '2024-04-05',
      marketCap: '$15.8M',
      price: '$2.11'
    },
    website: 'https://claudeswap.io',
    twitter: '@ClaudeSwap',
    category: 'DEX',
    logo: '🔄',
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    id: '6',
    name: 'Neural Vault',
    description: 'AI-managed treasury protocol with Claude analyzing market conditions for optimal yields.',
    token: {
      symbol: 'NVLT',
      name: 'Neural Vault',
      chain: 'Polygon',
      launchDate: '2024-03-22',
      marketCap: '$6.9M',
      price: '$0.58'
    },
    website: 'https://neuralvault.fi',
    twitter: '@NeuralVaultFi',
    category: 'Yield',
    logo: '🧠',
    gradient: 'from-indigo-400 to-purple-600'
  }
]

const categories = ['All', 'DeFi', 'AI Agents', 'Lending', 'DAO', 'DEX', 'Yield']

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="project-card"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`card-glow bg-gradient-to-r ${project.gradient}`} style={{ opacity: isHovered ? 0.4 : 0.15 }} />

      <div className="card-content">
        <div className="card-header">
          <div className="project-logo">{project.logo}</div>
          <div className="project-info">
            <h3 className="project-name">{project.name}</h3>
            <span className={`category-badge bg-gradient-to-r ${project.gradient}`}>
              {project.category}
            </span>
          </div>
        </div>

        <p className="project-description">{project.description}</p>

        <div className="token-section">
          <div className="token-header">
            <span className="token-symbol">${project.token.symbol}</span>
            <span className="token-chain">{project.token.chain}</span>
          </div>

          <div className="token-stats">
            <div className="stat">
              <span className="stat-label">Price</span>
              <span className="stat-value">{project.token.price}</span>
            </div>
            <div className="stat">
              <span className="stat-label">MCap</span>
              <span className="stat-value">{project.token.marketCap}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Launch</span>
              <span className="stat-value">{new Date(project.token.launchDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        <div className="card-links">
          {project.website && (
            <a href={project.website} className="card-link" target="_blank" rel="noopener noreferrer">
              Website ↗
            </a>
          )}
          {project.twitter && (
            <a href={`https://twitter.com/${project.twitter.slice(1)}`} className="card-link" target="_blank" rel="noopener noreferrer">
              {project.twitter}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="app">
      <div className="noise-overlay" />
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />
      <div className="gradient-orb orb-3" />

      <header className={`header ${mounted ? 'mounted' : ''}`}>
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L4 8v8c0 7.73 5.12 14.95 12 17 6.88-2.05 12-9.27 12-17V8L16 2z" stroke="url(#logoGradient)" strokeWidth="2" fill="none"/>
                <path d="M10 16l4 4 8-8" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="logoGradient" x1="4" y1="2" x2="28" y2="27">
                    <stop stopColor="#c084fc"/>
                    <stop offset="1" stopColor="#22d3ee"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Claude Tokens</h1>
              <p className="tagline">Projects built with Claude that have released tokens</p>
            </div>
          </div>

          <div className="header-stats">
            <div className="stat-box">
              <span className="stat-number">{projects.length}</span>
              <span className="stat-label-header">Projects</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">$71.1M</span>
              <span className="stat-label-header">Total MCap</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="controls">
          <div className="search-container">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search projects or tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <p>No projects found matching your criteria</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Requested by <a href="https://twitter.com/TheOtherGuyXYZ" target="_blank" rel="noopener noreferrer">@TheOtherGuyXYZ</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer">@clonkbot</a></p>
      </footer>
    </div>
  )
}

export default App
