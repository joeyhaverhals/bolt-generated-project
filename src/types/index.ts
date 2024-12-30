export interface Service {
  title: string
  image: string
  price: string
  description: string
}

export interface Testimonial {
  name: string
  role: string
  image: string
  quote: string
  background: string
}

export interface BlogPost {
  title: string
  image: string
  category: string
  description: string
  featured?: boolean
}

export interface AboutSection {
  title: string
  description: string
}

export interface Stat {
  number: string
  label: string
}
