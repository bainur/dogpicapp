class HomeController < ApplicationController
  include HTTParty
  def index; end

  def fetch_image
    breed = params[:breed]
    begin
      response = fetch_image_from_api(breed)

      render json: response
    rescue StandardError => e
      render json: { status: 'error', error: e.message }, status: 200
    end
  end

  private

  def fetch_image_from_api(breed)
    response = HTTParty.get("https://dog.ceo/api/breed/#{breed}/images/random")

    raise StandardError, "Failed to fetch image for #{breed}" unless response.success?

    JSON.parse(response.body)
  end
end
