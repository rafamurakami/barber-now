class AdminsController < ApplicationController
  def create
    Rails.logger.info "Recebendo requisição de criação de admin: #{params.inspect}"
    
    admin = Admin.new(admin_params)
    if admin.save
      Rails.logger.info "Admin criado com sucesso: #{admin.id}"
      render json: { message: 'Admin criado com sucesso!' }
    else
      Rails.logger.error "Erro ao criar admin: #{admin.errors.full_messages}"
      render json: { errors: admin.errors.full_messages }, status: :unprocessable_entity
    end
  rescue => e
    Rails.logger.error "Exceção ao criar admin: #{e.message}"
    render json: { error: 'Erro interno do servidor' }, status: :internal_server_error
  end

  private

  def admin_params
    params.permit(:first_name, :last_name, :email, :username, :password)
  end
end 