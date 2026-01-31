import { supabase } from '../config/database.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!['customer', 'owner', 'driver'].includes(role)) {
      return res.status(400).json({ error: 'Role must be customer, owner, or driver' });
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password, role }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ 
      message: 'User created successfully', 
      user: { id: data.id, name: data.name, email: data.email, role: data.role } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};