class CreateAdmins < ActiveRecord::Migration[7.0]
  def change
    create_table :admins do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :username, null: false
      t.string :password_digest, null: false

      t.timestamps
    end
    
    add_index :admins, :email, unique: true
    add_index :admins, :username, unique: true
  end
end 