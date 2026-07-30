import re

with open('css/sections.css', 'r') as f:
    css = f.read()

# Replace the main hero block
hero_block_pattern = re.compile(r'/\* 1\. Hero Section \*/.*?/\* Hero Form \*/', re.DOTALL)

original_hero = """/* 1. Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 120px;
  overflow: hidden;
}

.hero-media-wrapper {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 0;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: url('../assets/images/hero.webp');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  animation: bgZoom 20s infinite alternate linear;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(26, 54, 40, 0.35);
  z-index: 1;
}

@keyframes bgZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

.hero .container {
  position: relative;
  z-index: 10;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 80px;
  align-items: center;
  justify-content: space-between;
}

.hero-content {
  color: var(--color-primary-light);
}

.premium-label {
  display: inline-block;
  color: var(--color-accent-gold);
  margin-bottom: 24px;
}

.hero-content h1 {
  font-size: var(--text-h1);
  margin-bottom: 24px;
  line-height: 1.1;
  color: var(--color-primary-light);
}

.subheading {
  font-size: var(--text-body-large);
  margin-bottom: 40px;
  color: rgba(249, 247, 243, 0.9);
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.btn-secondary.dark {
  background-color: var(--color-primary-dark);
  color: var(--color-primary-light);
  border: 1px solid var(--color-primary-dark);
}
.btn-secondary.dark:hover {
  background-color: #264A38;
}

.hero-highlights {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary-light);
}

.hero-highlights .divider {
  width: 1px;
  height: 24px;
  background-color: rgba(249, 247, 243, 0.3);
}

/* Hero Form */"""

css = hero_block_pattern.sub(original_hero, css)

glass_form_pattern = re.compile(r'\.glass-form \{.*?\}', re.DOTALL)
original_glass_form = """.glass-form {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius-card);
  padding: 40px;
  box-shadow: var(--shadow-premium);
}"""

# only replace the first occurrence
css = glass_form_pattern.sub(original_glass_form, css, count=1)

glass_form_h3 = re.compile(r'\.glass-form h3 \{.*?\}', re.DOTALL)
original_glass_form_h3 = """.glass-form h3 {
  color: var(--color-primary-light);
  margin-bottom: 32px;
  font-family: var(--font-heading);
  font-size: var(--text-h3);
}"""

css = glass_form_h3.sub(original_glass_form_h3, css, count=1)

with open('css/sections.css', 'w') as f:
    f.write(css)

