import axios from "axios";
import { EnderecoService } from "../../data/usecases/endereco-service";
import { EnderecoAutocomplete } from "../../domain/models/endereco-autocomplete";

export class GoogleApiAdapter implements EnderecoService {

  async buscar(endereco: string): Promise<EnderecoAutocomplete[] | undefined> {

    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + ${endereco}  + '&types=geocode&language=pt-br&components=country:br&key=${process.env.GOOGLE_API_KEY}`)

    let enderecosAutocomplete: EnderecoAutocomplete[] = []

    if (response.status == 200) {

      for (let prediction of response.data.predictions) {

        if (prediction.terms.length === 1) {
          enderecosAutocomplete.push({ escopoBusca: 'pais', descricao: prediction.description, endereco: { pais: prediction.terms[0].value } })

        }

        if (prediction.terms.length === 3) {
          enderecosAutocomplete.push({ escopoBusca: 'cidade', descricao: prediction.description, endereco: { cidade: prediction.terms[0].value, estado: prediction.terms[1].value, pais: prediction.terms[2].value } })

        }

        if (prediction.terms.length === 4) {
          enderecosAutocomplete.push({ escopoBusca: 'bairro', descricao: prediction.description, endereco: { bairro: prediction.terms[0].value, cidade: prediction.terms[1].value, estado: prediction.terms[2].value, pais: prediction.terms[3].value } })

        }

        if (prediction.terms.length === 5) {

          enderecosAutocomplete.push({ escopoBusca: 'logradouro', descricao: prediction.description, endereco: { logradouro: prediction.terms[0].value, bairro: prediction.terms[1].value, cidade: prediction.terms[1].value, estado: prediction.terms[2].value, pais: prediction.terms[3].value } })

        }

        return new Promise(resolve => resolve(enderecosAutocomplete))
      }
    }

    return new Promise(resolve => resolve(undefined))


  }

}