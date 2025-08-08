class AgendaController < ApplicationController
  before_action :authorize_request

  def index
    # Dados mockados da agenda semanal
    agenda = [
      { date: '2024-08-05', description: 'Corte de cabelo - João Silva', time: '09:00' },
      { date: '2024-08-05', description: 'Barba - Pedro Santos', time: '10:30' },
      { date: '2024-08-06', description: 'Corte + Barba - Lucas Oliveira', time: '14:00' },
      { date: '2024-08-06', description: 'Corte de cabelo - Carlos Lima', time: '16:00' },
      { date: '2024-08-07', description: 'Barba - Roberto Costa', time: '11:00' },
      { date: '2024-08-08', description: 'Corte + Barba - André Pereira', time: '15:30' },
      { date: '2024-08-09', description: 'Corte de cabelo - Felipe Souza', time: '13:00' }
    ]
    render json: agenda
  end

  private

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      decoded = JWT.decode(header, Rails.application.secrets.secret_key_base)[0]
      @current_admin = Admin.find(decoded['admin_id'])
    rescue
      render json: { errors: 'Não autorizado' }, status: :unauthorized
    end
  end
end 