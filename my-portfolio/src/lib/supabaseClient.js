// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sqrsnkcvmzgfsdxovpob.supabase.co'
const supabaseAnonKey = 'sb_publishable_HePtKPZFq7Ra1ARJZiaLsQ_G_ROfN85'

class PortfolioDatabaseService {
  constructor() {
    // Initialize the engine link inside the constructor (like __init__ in Python)
    this.client = createClient(supabaseUrl, supabaseAnonKey)
  }

  // Method 1: Fetch Projects
  async getProjects() {
    const { data, error } = await this.client
      .from('projects')
      .select('*')
    
    if (error) {
      console.error('Error streaming projects:', error)
      return []
    }
    return data
  }

  // Method 2: Fetch Skills (Easy to add later!)
  async getSkills() {
    const { data, error } = await this.client
      .from('skills')
      .select('*')
    
    if (error) {
      console.error('Error streaming skills:', error)
      return []
    }
    return data
  }

  // Method 3: Fetch Resume Profile Information
  async getProfile() {
    const { data, error } = await this.client
      .from('profile')
      .select('*')
      .single() // Grabs just one row object instead of an array
    
    return error ? null : data
  }
}

// 🌟 Instantiate the class and export a single, reusable service object!
export const DB = new PortfolioDatabaseService()
