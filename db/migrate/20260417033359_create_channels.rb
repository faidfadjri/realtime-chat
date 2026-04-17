class CreateChannels < ActiveRecord::Migration[8.1]
  def change
    create_table :channels do |t|
      t.string :name
      t.string :slug

      t.timestamps
    end
    add_index :channels, :slug, unique: true
  end
end
