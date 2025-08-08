class AuthController < ApplicationController
  def login
    admin = Admin.find_by(username: params[:username])
    if admin&.authenticate(params[:password])
      token = encode_token({ admin_id: admin.id })
      render json: { token: token }
    else
      render json: { error: 'Credenciais inválidas' }, status: :unauthorized
    end
  end

  private

  def encode_token(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end 