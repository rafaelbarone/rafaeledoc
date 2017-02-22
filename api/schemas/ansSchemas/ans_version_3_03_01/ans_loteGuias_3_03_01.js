const builder = require('xmlbuilder');
const md5 = require('js-md5')
const fs = require('fs')


// -- ELEGIBILIDADE BUILDER --


exports.loteGuiasSchema = [{
	ansName: 'ans:cabecalho',
	edocName: 'cabecalho',
	order: 1,
	value: [{
		ansName: 'ans:identificacaoTransacao',
		edocName: 'identificacaoTransacao',
		order: 1,
		value: [{
			ansName: 'ans:tipoTransacao',
			edocName: 'tipoTransacao',
			order: 1,
			value: (validData) => {
				return validData.cabecalho.identificacaoTransacao.tipoTransacao
			}
		}, {
			ansName: 'ans:sequencialTransacao',
			edocName: 'sequencialTransacao',
			order: 2,
			value: (validData) => {
				return validData.cabecalho.identificacaoTransacao.sequencialTransacao
			}
		}, {
			ansName: 'ans:dataRegistroTransacao',
			edocName: 'dataRegistroTransacao',
			order: 3,
			value: (validData) => {
				return validData.cabecalho.identificacaoTransacao.dataRegistroTransacao
			}
		}, {
			ansName: 'ans:horaRegistroTransacao',
			edocName: 'horaRegistroTransacao',
			order: 4,
			value: (validData) => {
				return validData.cabecalho.identificacaoTransacao.horaRegistroTransacao
			}
		}]
	}, {
		ansName: 'ans:origem',
		edocName: 'origem',
		order: 2,
		value: [{
			ansName: 'ans:identificacaoPrestador',
			edocName: 'identificacaoPrestador',
			order: 1,
			value: [{
				ansName: (validData) => {
					if (validData.cabecalho.origem.identificacaoPrestador.CPF) return 'ans:CPF'
					if (validData.cabecalho.origem.identificacaoPrestador.CNPJ) return 'ans:CNPJ'
					return 'ans:codigoPrestadorNaOperadora'
				},
				edocName: (validData) => {
					if (validData.cabecalho.origem.identificacaoPrestador.CPF) return 'CPF'
					if (validData.cabecalho.origem.identificacaoPrestador.CNPJ) return 'CNPJ'
					return 'codigoPrestadorNaOperadora'
				},
				order: 1,
				value: (validData) => {
					if (validData.cabecalho.origem.identificacaoPrestador.CPF) return validData.cabecalho.origem.identificacaoPrestador.CPF
					if (validData.cabecalho.origem.identificacaoPrestador.CNPJ) return validData.cabecalho.origem.identificacaoPrestador.CNPJ
					return validData.cabecalho.origem.identificacaoPrestador.codigoPrestadorNaOperadora
				}

			}]
		}]
	}, {
		ansName: 'ans:destino',
		edocName: 'destino',
		order: 3,
		value: [{
			ansName: 'ans:registroANS',
			edocName: 'registroANS',
			order: 1,
			value: (validData) => {
				return validData.cabecalho.destino.registroANS
			}
		}]
	}, {
		ansName: 'ans:Padrao',
		edocName: 'padrao',
		order: 4,
		value: (validData) =>{
			return validData.cabecalho.padrao
		}
	}, {
		ansName: 'ans:loginSenhaPrestador',
		edocName: 'loginSenhaPrestador',
		order: 5,
		value: [{
			ansName: 'ans:loginPrestador',
			edocName: 'loginPrestador',
			order:1,
			value: (validData)=>{
				return validData.cabecalho.loginSenhaPrestador.loginPrestador
			}
		},{
			ansName: 'ans:senhaPrestador',
			edocName: 'senhaPrestador',
			order:1,
			value: (validData)=>{
				return validData.cabecalho.loginSenhaPrestador.senhaPrestador
			}
		}]
	}]
},{
	ansName: 'ans:prestadorParaOperadora',
	edocName: 'prestadorParaOperadora',
	order: 2,
	value:[{
		ansName: 'ans:loteGuias',
		edocName: 'loteGuias',
		order: 1,
		value:[{
			ansName: 'ans:numeroLote',
			edocName: 'numeroLote',
			order: 1,
			value: (validData)=>{
				return validData.prestadorParaOperadora.loteGuias.numeroLote
			}
		},{
			ansName: 'ans:guiasTISS',
			edocName: 'guiasTISS',
			order: 2,
			value: [{
				ansName: 'ans:guiaSP-SADT',
				edocName: 'guiaSPSADT',
				order: 1,
				include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT ? 'include' : 'exclude',
				value: [{
					ansName: 'ans:cabecalhoGuia',
					edocName: 'cabecalhoConsulta',
					order: 1,
					value: [{
						ansName: 'ans:registroANS',
						edocName: 'registroANS',
						order: 1,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.cabecalhoGuia.registroANS
						}
					},{
						ansName: 'ans:numeroGuiaPrestador',
						edocName: 'numeroGuiaPrestador',
						order: 2,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.cabecalhoGuia.numeroGuiaPrestador
						}
					},{
						ansName: 'ans:guiaPrincipal',
						edocName: 'guiaPrincipal',
						order: 3, 
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.cabecalhoGuia.guiaPrincipal ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.cabecalhoGuia.guiaPrincipal
						}
					}]
				},{
					ansName: 'ans:dadosAutorizacao',
					edocName: 'dadosAutorizacao',
					order: 2, 
					include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAutorizacao ? 'include' : 'exclude',
					value: [{
						ansName: 'ans:numeroGuiaOperadora',
						edocName: 'numeroGuiaOperadora',
						order: 1, 
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAutorizacao.numeroGuiaOperadora ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAutorizacao.numeroGuiaOperadora
						}
					},{
						ansName: 'ans:dataAutorizacao',
						edocName: 'dataAutorizacao',
						order: 2, 
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAutorizacao.dataAutorizacao
						}
					},{
						ansName: 'ans:senha',
						edocName: 'senha',
						order: 3,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAutorizacao.senha ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAutorizacao.senha 
						}
					},{
						ansName: 'ans:dataValidadeSenha',
						edocName: 'dataValidadeSenha',
						order: 4, 
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAutorizacao.dataValidadeSenha ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAutorizacao.dataValidadeSenha
						}
					}]
				},{
					ansName: 'ans:dadosBeneficiario',
					edocName: 'dadosBeneficiario',
					order: 3,
					value: [{
						ansName: 'ans:numeroCarteira',
						edocName: 'numeroCarteira',
						order: 1, 
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosBeneficiario.numeroCarteira
						}
					},{
						ansName: 'ans:atendimentoRN',
						edocName: 'atendimentoRN',
						order: 2, 
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosBeneficiario.atendimentoRN
						}
					},{
						ansName: 'ans:nomeBeneficiario',
						edocName: 'nomeBeneficiario',
						order: 3, 
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosBeneficiario.nomeBeneficiario
						}
					},{
						ansName: 'ans:numeroCNS',
						edocName: 'numeroCNS',
						order: 4, 
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosBeneficiario.numeroCNS ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosBeneficiario.numeroCNS
						}
					},{
						ansName: 'ans:identificadorBeneficiario',
						edocName: 'identificadorBeneficiario',
						order: 5,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosBeneficiario.identificadorBeneficiario ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosBeneficiario.identificadorBeneficiario
						}
					}]
				},{
					ansName: 'ans:dadosSolicitante',
					edocName: 'dadosSolicitante',
					order: 4,
					value: [{
						ansName: 'ans:contratadoSolicitante',
						edocName: 'contratadoSolicitante',
						order: 1,
						value: [{
							ansName: (validData)=>{
								if(validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.contratadoSolicitante.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
								if(validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.contratadoSolicitante.cpfContratado) return 'ans:cpfContratado'
								return 'ans:cnpjContratado'
							},
							edocName: (validData)=>{
								if(validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.contratadoSolicitante.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
								if(validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.contratadoSolicitante.cpfContratado) return 'cpfContratado'
								return 'cnpjContratado'
							},
							order: 1,
							value: (validData)=>{
								if(validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.contratadoSolicitante.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.contratadoSolicitante.codigoPrestadorNaOperadora
								if(validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.contratadoSolicitante.cpfContratado) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.contratadoSolicitante.cpfContratado
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.contratadoSolicitante.cnpjContratado
							}
						},{
							ansName: 'ans:nomeContratado',
							edocName: 'nomeContratado',
							order: 2,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.contratadoSolicitante.nomeContratado
							}
						}]
					},{
						ansName: 'ans:profissionalSolicitante',
						edocName: 'profissionalSolicitante',
						order: 2,
						value: [{
							ansName: 'ans:nomeProfissional',
							edocName: 'nomeProfissional',
							order: 1,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.profissionalSolicitante.nomeProfissional ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.profissionalSolicitante.nomeProfissional
							}
						},{
							ansName: 'ans:conselhoProfissional',
							edocName: 'conselhoProfissional',
							order: 2,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.profissionalSolicitante.conselhoProfissional
							}
						},{
							ansName: 'ans:numeroConselhoProfissional',
							edocName: 'numeroConselhoProfissional',
							order: 3,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.profissionalSolicitante.numeroConselhoProfissional
							}
						},{
							ansName: 'ans:UF',
							edocName: 'UF',
							order: 4,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.profissionalSolicitante.UF
							}
						},{
							ansName: 'ans:CBOS',
							edocName: 'CBOS',
							order: 5, 
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitante.profissionalSolicitante.CBOS
							}
						}]
					}]
				},{
					ansName: 'ans:dadosSolicitacao',
					edocName: 'dadosSolicitacao',
					order: 5,
					value: [{
						ansName: 'ans:dataSolicitacao',
						edocName: 'dataSolicitacao',
						order: 1,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitacao.dataSolicitacao ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitacao.dataSolicitacao
						}
					},{
						ansName: 'ans:caraterAtendimento',
						edocName: 'caraterAtendimento',
						order: 2,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitacao.caraterAtendimento
						}
					},{
						ansName: 'ans:indicacaoClinica',
						edocName: 'indicacaoClinica',
						order: 3,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitacao.indicacaoClinica ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosSolicitacao.indicacaoClinica
						}
					}]
				},{
					ansName: 'ans:dadosExecutante',
					edocName: 'dadosExecutante',
					order: 6,
					value: [{
						ansName: 'ans:contratadoExecutante',
						edocName: 'contratadoExecutante',
						order: 1,
						value: [{
							ansName: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosExecutante.contratadoExecutante.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosExecutante.contratadoExecutante.cpfContratado) return 'ans:cpfContratado'
								return 'ans:cnpjContratado'
							},
							edocName: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosExecutante.contratadoExecutante.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosExecutante.contratadoExecutante.cpfContratado) return 'cpfContratado'
								return 'cnpjContratado'
							},
							order: 1,
							value: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosExecutante.contratadoExecutante.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosExecutante.contratadoExecutante.codigoPrestadorNaOperadora
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosExecutante.contratadoExecutante.cpfContratado) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosExecutante.contratadoExecutante.cpfContratado
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosExecutante.contratadoExecutante.cnpjContratado
							}
						},{
							ansName: 'ans:nomeContratado',
							edocName: 'nomeContratado',
							order: 2,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosExecutante.contratadoExecutante.nomeContratado
							}
						}]
					},{
						ansName: 'ans:CNES',
						edocName: 'CNES',
						order: 2,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosExecutante.CNES
						}
					}]
				},{
					ansName: 'ans:dadosAtendimento',
					edocName: 'dadosAtendimento',
					order: 7,
					value: [{
						ansName: 'ans:tipoAtendimento',
						edocName: 'tipoAtendimento',
						order: 1,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAtendimento.tipoAtendimento
						}
					},{
						ansName: 'ans:indicacaoAcidente',
						edocName: 'indicacaoAcidente',
						order: 2,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAtendimento.indicacaoAcidente
						}
					},{
						ansName: 'ans:tipoConsulta',
						edocName: 'tipoConsulta',
						order: 3,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAtendimento.tipoConsulta ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAtendimento.tipoConsulta
						}
					},{
						ansName: 'ans:motivoEncerramento',
						edocName: 'motivoEncerramento',
						order: 4,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAtendimento.motivoEncerramento ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.dadosAtendimento.motivoEncerramento
						}
					}]
				},{
					ansName: 'ans:procedimentosExecutados',
					edocName: 'procedimentosExecutados',
					order: 8,
					include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados ? 'include' : 'exclude',
					value: [{
						ansName: 'ans:procedimentoExecutado',
						edocName: 'procedimentoExecutado',
						order: 1,
						value: [{
							ansName: 'ans:dataExecucao',
							edocName: 'dataExecucao',
							order: 1,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.dataExecucao
							}
						},{
							ansName: 'ans:horaInicial',
							edocName: 'horaInicial',
							order: 2,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.horaInicial ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.horaInicial
							}
						},{
							ansName: 'ans:horaFinal',
							edocName: 'horaFinal',
							order: 3,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.horaFinal ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.horaFinal
							}
						},{
							ansName: 'ans:procedimento',
							edocName: 'procedimento',
							order: 4,
							value: [{
								ansName: 'ans:codigoTabela',
								edocName: 'codigoTabela',
								order: 1,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.procedimento.codigoTabela
								}
							},{
								ansName: 'ans:codigoProcedimento',
								edocName: 'codigoProcedimento',
								order: 2,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.procedimento.codigoProcedimento
								}
							},{
								ansName: 'ans:descricaoProcedimento',
								edocName: 'descricaoProcedimento',
								order: 3,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.procedimento.descricaoProcedimento
								}
							}]
						},{
							ansName: 'ans:quantidadeExecutada',
							edoc: 'quantidadeExecutada',
							order: 5, 
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.quantidadeExecutada
							}
						},{
							ansName: 'ans:viaAcesso',
							edocName: 'viaAcesso',
							order: 6, 
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.viaAcesso ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.viaAcesso
							}
						},{
							ansName: 'ans:tecnicaUtilizada',
							edocName: 'tecnicaUtilizada',
							order: 7,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.tecnicaUtilizada ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.tecnicaUtilizada
							}
						},{
							ansName: 'ans:reducaoAcrescimo',
							edocName: 'reducaoAcrescimo',
							order: 8,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.reducaoAcrescimo
							}
						},{
							ansName: 'ans:valorUnitario',
							edocName: 'valorUnitario',
							order: 9,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.valorUnitario
							}
						},{
							ansName: 'ans:valorTotal',
							edocName: 'valorTotal',
							order: 10,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.valorTotal
							}
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 11, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 12, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[1]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[1].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[1].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[1].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[1].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[1].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[1].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[1].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[1].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 13, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[2].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[2].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[2].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[2].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[2].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[2].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[2].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[2].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 14, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[3]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[3].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[3].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[3].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[3].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[3].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[3].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[3].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[3].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 15, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[4]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[4].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[4].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[4].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[4].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[4].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[4].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[4].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[0].procedimentoExecutado.equipeSadt[4].CBOS
								}
							}]
						}]
					},{
						ansName: 'ans:procedimentoExecutado',
						edocName: 'procedimentoExecutado',
						order: 2,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1] ? 'include' : 'exclude',
						value: [{
							ansName: 'ans:dataExecucao',
							edocName: 'dataExecucao',
							order: 1,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.dataExecucao
							}
						},{
							ansName: 'ans:horaInicial',
							edocName: 'horaInicial',
							order: 2,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.horaInicial ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.horaInicial
							}
						},{
							ansName: 'ans:horaFinal',
							edocName: 'horaFinal',
							order: 3,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.horaFinal ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.horaFinal
							}
						},{
							ansName: 'ans:procedimento',
							edocName: 'procedimento',
							order: 4,
							value: [{
								ansName: 'ans:codigoTabela',
								edocName: 'codigoTabela',
								order: 1,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.procedimento.codigoTabela
								}
							},{
								ansName: 'ans:codigoProcedimento',
								edocName: 'codigoProcedimento',
								order: 2,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.procedimento.codigoProcedimento
								}
							},{
								ansName: 'ans:descricaoProcedimento',
								edocName: 'descricaoProcedimento',
								order: 3,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.procedimento.descricaoProcedimento
								}
							}]
						},{
							ansName: 'ans:quantidadeExecutada',
							edoc: 'quantidadeExecutada',
							order: 5, 
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.quantidadeExecutada
							}
						},{
							ansName: 'ans:viaAcesso',
							edocName: 'viaAcesso',
							order: 6, 
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.viaAcesso ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.viaAcesso
							}
						},{
							ansName: 'ans:tecnicaUtilizada',
							edocName: 'tecnicaUtilizada',
							order: 7,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.tecnicaUtilizada ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.tecnicaUtilizada
							}
						},{
							ansName: 'ans:reducaoAcrescimo',
							edocName: 'reducaoAcrescimo',
							order: 8,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.reducaoAcrescimo
							}
						},{
							ansName: 'ans:valorUnitario',
							edocName: 'valorUnitario',
							order: 9,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.valorUnitario
							}
						},{
							ansName: 'ans:valorTotal',
							edocName: 'valorTotal',
							order: 10,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.valorTotal
							}
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 11, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[0].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 12, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[1].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 13, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[2].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 14, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[3].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 15, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[1].procedimentoExecutado.equipeSadt[4].CBOS
								}
							}]
						}]
					},{
						ansName: 'ans:procedimentoExecutado',
						edocName: 'procedimentoExecutado',
						order: 3,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2] ? 'include' : 'exclude',
						value: [{
							ansName: 'ans:dataExecucao',
							edocName: 'dataExecucao',
							order: 1,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.dataExecucao
							}
						},{
							ansName: 'ans:horaInicial',
							edocName: 'horaInicial',
							order: 2,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.horaInicial ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.horaInicial
							}
						},{
							ansName: 'ans:horaFinal',
							edocName: 'horaFinal',
							order: 3,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.horaFinal ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.horaFinal
							}
						},{
							ansName: 'ans:procedimento',
							edocName: 'procedimento',
							order: 4,
							value: [{
								ansName: 'ans:codigoTabela',
								edocName: 'codigoTabela',
								order: 1,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.procedimento.codigoTabela
								}
							},{
								ansName: 'ans:codigoProcedimento',
								edocName: 'codigoProcedimento',
								order: 2,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.procedimento.codigoProcedimento
								}
							},{
								ansName: 'ans:descricaoProcedimento',
								edocName: 'descricaoProcedimento',
								order: 3,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.procedimento.descricaoProcedimento
								}
							}]
						},{
							ansName: 'ans:quantidadeExecutada',
							edoc: 'quantidadeExecutada',
							order: 5, 
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.quantidadeExecutada
							}
						},{
							ansName: 'ans:viaAcesso',
							edocName: 'viaAcesso',
							order: 6, 
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.viaAcesso ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.viaAcesso
							}
						},{
							ansName: 'ans:tecnicaUtilizada',
							edocName: 'tecnicaUtilizada',
							order: 7,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.tecnicaUtilizada ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.tecnicaUtilizada
							}
						},{
							ansName: 'ans:reducaoAcrescimo',
							edocName: 'reducaoAcrescimo',
							order: 8,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.reducaoAcrescimo
							}
						},{
							ansName: 'ans:valorUnitario',
							edocName: 'valorUnitario',
							order: 9,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.valorUnitario
							}
						},{
							ansName: 'ans:valorTotal',
							edocName: 'valorTotal',
							order: 10,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.valorTotal
							}
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 11, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[0].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 12, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[1].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 13, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[2].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 14, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[3].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 15, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[2].procedimentoExecutado.equipeSadt[4].CBOS
								}
							}]
						}]
					},{
						ansName: 'ans:procedimentoExecutado',
						edocName: 'procedimentoExecutado',
						order: 4,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3] ? 'include' : 'exclude',
						value: [{
							ansName: 'ans:dataExecucao',
							edocName: 'dataExecucao',
							order: 1,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.dataExecucao
							}
						},{
							ansName: 'ans:horaInicial',
							edocName: 'horaInicial',
							order: 2,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.horaInicial ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.horaInicial
							}
						},{
							ansName: 'ans:horaFinal',
							edocName: 'horaFinal',
							order: 3,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.horaFinal ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.horaFinal
							}
						},{
							ansName: 'ans:procedimento',
							edocName: 'procedimento',
							order: 4,
							value: [{
								ansName: 'ans:codigoTabela',
								edocName: 'codigoTabela',
								order: 1,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.procedimento.codigoTabela
								}
							},{
								ansName: 'ans:codigoProcedimento',
								edocName: 'codigoProcedimento',
								order: 2,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.procedimento.codigoProcedimento
								}
							},{
								ansName: 'ans:descricaoProcedimento',
								edocName: 'descricaoProcedimento',
								order: 3,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.procedimento.descricaoProcedimento
								}
							}]
						},{
							ansName: 'ans:quantidadeExecutada',
							edoc: 'quantidadeExecutada',
							order: 5, 
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.quantidadeExecutada
							}
						},{
							ansName: 'ans:viaAcesso',
							edocName: 'viaAcesso',
							order: 6, 
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.viaAcesso ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.viaAcesso
							}
						},{
							ansName: 'ans:tecnicaUtilizada',
							edocName: 'tecnicaUtilizada',
							order: 7,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.tecnicaUtilizada ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.tecnicaUtilizada
							}
						},{
							ansName: 'ans:reducaoAcrescimo',
							edocName: 'reducaoAcrescimo',
							order: 8,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.reducaoAcrescimo
							}
						},{
							ansName: 'ans:valorUnitario',
							edocName: 'valorUnitario',
							order: 9,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.valorUnitario
							}
						},{
							ansName: 'ans:valorTotal',
							edocName: 'valorTotal',
							order: 10,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.valorTotal
							}
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 11, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[0].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 12, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[1].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 13, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[2].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 14, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[3].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 15, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[3].procedimentoExecutado.equipeSadt[4].CBOS
								}
							}]
						}]
					},{
						ansName: 'ans:procedimentoExecutado',
						edocName: 'procedimentoExecutado',
						order: 5,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4] ? 'include' : 'exclude',
						value: [{
							ansName: 'ans:dataExecucao',
							edocName: 'dataExecucao',
							order: 1,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.dataExecucao
							}
						},{
							ansName: 'ans:horaInicial',
							edocName: 'horaInicial',
							order: 2,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.horaInicial ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.horaInicial
							}
						},{
							ansName: 'ans:horaFinal',
							edocName: 'horaFinal',
							order: 3,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.horaFinal ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.horaFinal
							}
						},{
							ansName: 'ans:procedimento',
							edocName: 'procedimento',
							order: 4,
							value: [{
								ansName: 'ans:codigoTabela',
								edocName: 'codigoTabela',
								order: 1,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.procedimento.codigoTabela
								}
							},{
								ansName: 'ans:codigoProcedimento',
								edocName: 'codigoProcedimento',
								order: 2,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.procedimento.codigoProcedimento
								}
							},{
								ansName: 'ans:descricaoProcedimento',
								edocName: 'descricaoProcedimento',
								order: 3,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.procedimento.descricaoProcedimento
								}
							}]
						},{
							ansName: 'ans:quantidadeExecutada',
							edoc: 'quantidadeExecutada',
							order: 5, 
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.quantidadeExecutada
							}
						},{
							ansName: 'ans:viaAcesso',
							edocName: 'viaAcesso',
							order: 6, 
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.viaAcesso ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.viaAcesso
							}
						},{
							ansName: 'ans:tecnicaUtilizada',
							edocName: 'tecnicaUtilizada',
							order: 7,
							include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.tecnicaUtilizada ? 'include' : 'exclude',
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.tecnicaUtilizada
							}
						},{
							ansName: 'ans:reducaoAcrescimo',
							edocName: 'reducaoAcrescimo',
							order: 8,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.reducaoAcrescimo
							}
						},{
							ansName: 'ans:valorUnitario',
							edocName: 'valorUnitario',
							order: 9,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.valorUnitario
							}
						},{
							ansName: 'ans:valorTotal',
							edocName: 'valorTotal',
							order: 10,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.valorTotal
							}
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 11, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[0].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 12, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[1].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 13, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[2].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 14, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[3].CBOS
								}
							}]
						},{
							ansName: 'ans:equipeSadt',
							edocName: 'equipeSadt',
							order: 15, 
							include: (validData)=>{
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt){
									if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4]){
										return 'include'
									}
								}
								return 'exclude'	
							},
							value: [{
								ansName: 'ans:grauPart',
								edocName: 'grauPart',
								order: 1,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4].grauPart ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4].grauPart
								}
							},{
								ansName: 'ans:codProfissional',
								edocName: 'codProfissional',
								order: 2,
								value: [{
									ansName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
										return 'ans:cpfContratado'
									},
									edocName: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
										return 'cpfContratado'
									},
									order: 1,
									value: (validData)=>{
										if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4].codProfissional.codigoPrestadorNaOperadora
										return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4].codProfissional.cpfContratado
									}
								}]
							},{
								ansName: 'ans:nomeProf',
								edocName: 'nomeProf',
								order: 3, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4].nomeProf
								}
							},{
								ansName: 'ans:conselho',
								edocName: 'conselho',
								order: 4, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4].conselho
								}
							},{
								ansName: 'ans:numeroConselhoProfissional',
								edocName: 'numeroConselhoProfissional',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4].numeroConselhoProfissional
								}
							},{
								ansName: 'ans:UF',
								edocName: 'UF',
								order: 6, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4].UF
								}
							},{
								ansName: 'ans:CBOS',
								edocName: 'CBOS',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.procedimentosExecutados[4].procedimentoExecutado.equipeSadt[4].CBOS
								}
							}]
						}]

					}]
				},{
					ansName: 'ans:outrasDespesas',
					edocName: 'outrasDespesas',
					order: 9,
					include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas ? 'include' : 'exclude',
					value: [{
						ansName: 'ans:despesa',
						edocName: 'despesa',
						order: 1,
						value: [{
							ansName: 'ans:codigoDespesa',
							edocName: 'codigoDespesa',
							order: 1,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.codigoDespesa
							}
						},{
							ansName: 'ans:servicosExecutados',
							edocName: 'servicosExecutados',
							order: 2, 
							value: [{
								ansName: 'ans:dataExecucao',
								edocName: 'dataExecucao',
								order: 1,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.dataExecucao
								}
							},{
								ansName: 'ans:horaInicial',
								edocName: 'horaInicial',
								order: 2,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.horaInicial ? 'include' : 'exclude', 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.horaInicial
								}
							},{
								ansName: 'ans:horaFinal',
								edocName: 'horaFinal',
								order: 3,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.horaFinal ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.horaFinal
								}
							},{
								ansName: 'ans:codigoTabela',
								edocName: 'codigoTabela',
								order: 4,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.codigoTabela
								}
							},{
								ansName: 'ans:codigoProcedimento',
								edocName: 'codigoProcedimento',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.codigoProcedimento
								}
							},{
								ansName: 'ans:quantidadeExecutada',
								edocName: 'quantidadeExecutada',
								order: 6,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.quantidadeExecutada
								}
							},{
								ansName: 'ans:unidadeMedida',
								edocName: 'unidadeMedida',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.unidadeMedida
								}
							},{
								ansName: 'ans:reducaoAcrescimo',
								edocName: 'reducaoAcrescimo',
								order: 8,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.reducaoAcrescimo
								}
							},{
								ansName: 'ans:valorUnitario',
								edocName: 'valorUnitario',
								order: 9,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.valorUnitario
								}
							},{
								ansName: 'ans:valorTotal',
								edocName: 'valorTotal',
								order: 10,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.valorTotal
								}
							},{
								ansName: 'ans:descricaoProcedimento',
								edocName: 'descricaoProcedimento',
								order: 11, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.descricaoProcedimento
								}
							},{
								ansName: 'ans:registroANVISA',
								edocName: 'registroANVISA',
								order: 12,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.registroANVISA ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.registroANVISA
								}
							},{
								ansName: 'ans:codigoRefFabricante',
								edocName: 'codigoRefFabricante',
								order: 13, 
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.codigoRefFabricante ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.codigoRefFabricante
								}
 							},{
 								ansName: 'ans:autorizacaoFuncionamento',
 								edocName: 'autorizacaoFuncionamento',
 								order: 14,
 								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.autorizacaoFuncionamento ? 'include' : 'exclude',
 								value: (validData)=>{
 									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[0].despesa.servicosExecutados.autorizacaoFuncionamento
 								}
 							}]
						}]
					},{
						ansName: 'ans:despesa',
						edocName: 'despesa',
						order: 2,
						include: (validData)=>{
							if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas){
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1]){
									return 'include'
								}
							}
							return 'exclude'
						},
						value: [{
							ansName: 'ans:codigoDespesa',
							edocName: 'codigoDespesa',
							order: 1,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.codigoDespesa
							}
						},{
							ansName: 'ans:servicosExecutados',
							edocName: 'servicosExecutados',
							order: 2, 
							value: [{
								ansName: 'ans:dataExecucao',
								edocName: 'dataExecucao',
								order: 1,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.dataExecucao
								}
							},{
								ansName: 'ans:horaInicial',
								edocName: 'horaInicial',
								order: 2,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.horaInicial ? 'include' : 'exclude', 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.horaInicial
								}
							},{
								ansName: 'ans:horaFinal',
								edocName: 'horaFinal',
								order: 3,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.horaFinal ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.horaFinal
								}
							},{
								ansName: 'ans:codigoTabela',
								edocName: 'codigoTabela',
								order: 4,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.codigoTabela
								}
							},{
								ansName: 'ans:codigoProcedimento',
								edocName: 'codigoProcedimento',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.codigoProcedimento
								}
							},{
								ansName: 'ans:quantidadeExecutada',
								edocName: 'quantidadeExecutada',
								order: 6,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.quantidadeExecutada
								}
							},{
								ansName: 'ans:unidadeMedida',
								edocName: 'unidadeMedida',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.unidadeMedida
								}
							},{
								ansName: 'ans:reducaoAcrescimo',
								edocName: 'reducaoAcrescimo',
								order: 8,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.reducaoAcrescimo
								}
							},{
								ansName: 'ans:valorUnitario',
								edocName: 'valorUnitario',
								order: 9,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.valorUnitario
								}
							},{
								ansName: 'ans:valorTotal',
								edocName: 'valorTotal',
								order: 10,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.valorTotal
								}
							},{
								ansName: 'ans:descricaoProcedimento',
								edocName: 'descricaoProcedimento',
								order: 11, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.descricaoProcedimento
								}
							},{
								ansName: 'ans:registroANVISA',
								edocName: 'registroANVISA',
								order: 12,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.registroANVISA ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.registroANVISA
								}
							},{
								ansName: 'ans:codigoRefFabricante',
								edocName: 'codigoRefFabricante',
								order: 13, 
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.codigoRefFabricante ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.codigoRefFabricante
								}
 							},{
 								ansName: 'ans:autorizacaoFuncionamento',
 								edocName: 'autorizacaoFuncionamento',
 								order: 14,
 								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.autorizacaoFuncionamento ? 'include' : 'exclude',
 								value: (validData)=>{
 									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[1].despesa.servicosExecutados.autorizacaoFuncionamento
 								}
 							}]
						}]
					},{
						ansName: 'ans:despesa',
						edocName: 'despesa',
						order: 3,
						include: (validData)=>{
							if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas){
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2]){
									return 'include'
								}
							}
							return 'exclude'
						},
						value: [{
							ansName: 'ans:codigoDespesa',
							edocName: 'codigoDespesa',
							order: 1,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.codigoDespesa
							}
						},{
							ansName: 'ans:servicosExecutados',
							edocName: 'servicosExecutados',
							order: 2, 
							value: [{
								ansName: 'ans:dataExecucao',
								edocName: 'dataExecucao',
								order: 1,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.dataExecucao
								}
							},{
								ansName: 'ans:horaInicial',
								edocName: 'horaInicial',
								order: 2,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.horaInicial ? 'include' : 'exclude', 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.horaInicial
								}
							},{
								ansName: 'ans:horaFinal',
								edocName: 'horaFinal',
								order: 3,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.horaFinal ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.horaFinal
								}
							},{
								ansName: 'ans:codigoTabela',
								edocName: 'codigoTabela',
								order: 4,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.codigoTabela
								}
							},{
								ansName: 'ans:codigoProcedimento',
								edocName: 'codigoProcedimento',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.codigoProcedimento
								}
							},{
								ansName: 'ans:quantidadeExecutada',
								edocName: 'quantidadeExecutada',
								order: 6,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.quantidadeExecutada
								}
							},{
								ansName: 'ans:unidadeMedida',
								edocName: 'unidadeMedida',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.unidadeMedida
								}
							},{
								ansName: 'ans:reducaoAcrescimo',
								edocName: 'reducaoAcrescimo',
								order: 8,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.reducaoAcrescimo
								}
							},{
								ansName: 'ans:valorUnitario',
								edocName: 'valorUnitario',
								order: 9,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.valorUnitario
								}
							},{
								ansName: 'ans:valorTotal',
								edocName: 'valorTotal',
								order: 10,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.valorTotal
								}
							},{
								ansName: 'ans:descricaoProcedimento',
								edocName: 'descricaoProcedimento',
								order: 11, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.descricaoProcedimento
								}
							},{
								ansName: 'ans:registroANVISA',
								edocName: 'registroANVISA',
								order: 12,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.registroANVISA ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.registroANVISA
								}
							},{
								ansName: 'ans:codigoRefFabricante',
								edocName: 'codigoRefFabricante',
								order: 13, 
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.codigoRefFabricante ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.codigoRefFabricante
								}
 							},{
 								ansName: 'ans:autorizacaoFuncionamento',
 								edocName: 'autorizacaoFuncionamento',
 								order: 14,
 								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.autorizacaoFuncionamento ? 'include' : 'exclude',
 								value: (validData)=>{
 									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[2].despesa.servicosExecutados.autorizacaoFuncionamento
 								}
 							}]
						}]
					},{
						ansName: 'ans:despesa',
						edocName: 'despesa',
						order: 4,
						include: (validData)=>{
							if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas){
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3]){
									return 'include'
								}
							}
							return 'exclude'
						},
						value: [{
							ansName: 'ans:codigoDespesa',
							edocName: 'codigoDespesa',
							order: 1,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.codigoDespesa
							}
						},{
							ansName: 'ans:servicosExecutados',
							edocName: 'servicosExecutados',
							order: 2, 
							value: [{
								ansName: 'ans:dataExecucao',
								edocName: 'dataExecucao',
								order: 1,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.dataExecucao
								}
							},{
								ansName: 'ans:horaInicial',
								edocName: 'horaInicial',
								order: 2,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.horaInicial ? 'include' : 'exclude', 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.horaInicial
								}
							},{
								ansName: 'ans:horaFinal',
								edocName: 'horaFinal',
								order: 3,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.horaFinal ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.horaFinal
								}
							},{
								ansName: 'ans:codigoTabela',
								edocName: 'codigoTabela',
								order: 4,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.codigoTabela
								}
							},{
								ansName: 'ans:codigoProcedimento',
								edocName: 'codigoProcedimento',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.codigoProcedimento
								}
							},{
								ansName: 'ans:quantidadeExecutada',
								edocName: 'quantidadeExecutada',
								order: 6,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.quantidadeExecutada
								}
							},{
								ansName: 'ans:unidadeMedida',
								edocName: 'unidadeMedida',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.unidadeMedida
								}
							},{
								ansName: 'ans:reducaoAcrescimo',
								edocName: 'reducaoAcrescimo',
								order: 8,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.reducaoAcrescimo
								}
							},{
								ansName: 'ans:valorUnitario',
								edocName: 'valorUnitario',
								order: 9,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.valorUnitario
								}
							},{
								ansName: 'ans:valorTotal',
								edocName: 'valorTotal',
								order: 10,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.valorTotal
								}
							},{
								ansName: 'ans:descricaoProcedimento',
								edocName: 'descricaoProcedimento',
								order: 11, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.descricaoProcedimento
								}
							},{
								ansName: 'ans:registroANVISA',
								edocName: 'registroANVISA',
								order: 12,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.registroANVISA ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.registroANVISA
								}
							},{
								ansName: 'ans:codigoRefFabricante',
								edocName: 'codigoRefFabricante',
								order: 13, 
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.codigoRefFabricante ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.codigoRefFabricante
								}
 							},{
 								ansName: 'ans:autorizacaoFuncionamento',
 								edocName: 'autorizacaoFuncionamento',
 								order: 14,
 								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.autorizacaoFuncionamento ? 'include' : 'exclude',
 								value: (validData)=>{
 									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[3].despesa.servicosExecutados.autorizacaoFuncionamento
 								}
 							}]
						}]
					},{
						ansName: 'ans:despesa',
						edocName: 'despesa',
						order: 5,
						include: (validData)=>{
							if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas){
								if (validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4]){
									return 'include'
								}
							}
							return 'exclude'
						},
						value: [{
							ansName: 'ans:codigoDespesa',
							edocName: 'codigoDespesa',
							order: 1,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.codigoDespesa
							}
						},{
							ansName: 'ans:servicosExecutados',
							edocName: 'servicosExecutados',
							order: 2, 
							value: [{
								ansName: 'ans:dataExecucao',
								edocName: 'dataExecucao',
								order: 1,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.dataExecucao
								}
							},{
								ansName: 'ans:horaInicial',
								edocName: 'horaInicial',
								order: 2,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.horaInicial ? 'include' : 'exclude', 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.horaInicial
								}
							},{
								ansName: 'ans:horaFinal',
								edocName: 'horaFinal',
								order: 3,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.horaFinal ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.horaFinal
								}
							},{
								ansName: 'ans:codigoTabela',
								edocName: 'codigoTabela',
								order: 4,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.codigoTabela
								}
							},{
								ansName: 'ans:codigoProcedimento',
								edocName: 'codigoProcedimento',
								order: 5,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.codigoProcedimento
								}
							},{
								ansName: 'ans:quantidadeExecutada',
								edocName: 'quantidadeExecutada',
								order: 6,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.quantidadeExecutada
								}
							},{
								ansName: 'ans:unidadeMedida',
								edocName: 'unidadeMedida',
								order: 7,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.unidadeMedida
								}
							},{
								ansName: 'ans:reducaoAcrescimo',
								edocName: 'reducaoAcrescimo',
								order: 8,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.reducaoAcrescimo
								}
							},{
								ansName: 'ans:valorUnitario',
								edocName: 'valorUnitario',
								order: 9,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.valorUnitario
								}
							},{
								ansName: 'ans:valorTotal',
								edocName: 'valorTotal',
								order: 10,
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.valorTotal
								}
							},{
								ansName: 'ans:descricaoProcedimento',
								edocName: 'descricaoProcedimento',
								order: 11, 
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.descricaoProcedimento
								}
							},{
								ansName: 'ans:registroANVISA',
								edocName: 'registroANVISA',
								order: 12,
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.registroANVISA ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.registroANVISA
								}
							},{
								ansName: 'ans:codigoRefFabricante',
								edocName: 'codigoRefFabricante',
								order: 13, 
								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.codigoRefFabricante ? 'include' : 'exclude',
								value: (validData)=>{
									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.codigoRefFabricante
								}
 							},{
 								ansName: 'ans:autorizacaoFuncionamento',
 								edocName: 'autorizacaoFuncionamento',
 								order: 14,
 								include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.autorizacaoFuncionamento ? 'include' : 'exclude',
 								value: (validData)=>{
 									return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.outrasDespesas[4].despesa.servicosExecutados.autorizacaoFuncionamento
 								}
 							}]
						}]
					}]
				},{
					ansName: 'ans:observacao',
					edocName: 'observacao',
					order: 10,
					include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.observacao ? 'include' : 'exclude',
					value: (validData)=>{
						return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.observacao
					}
				},{
					ansName: 'ans:valorTotal',
					edocName: 'valorTotal',
					order: 11, 
					value: [{
						ansName: 'ans:valorProcedimentos',
						edocName: 'valorProcedimentos',
						order: 1, 
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorProcedimentos ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorProcedimentos
						}
					},{
						ansName: 'ans:valorDiarias',
						edocName: 'valorDiarias',
						order: 2,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorDiarias ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorDiarias
						}
					},{
						ansName: 'ans:valorTaxasAlugueis',
						edocName: 'valorTaxasAlugueis',
						order: 3,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorTaxasAlugueis ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorTaxasAlugueis
						}
					},{
						ansName: 'ans:valorMateriais',
						edocName: 'valorMateriais',
						order: 4,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorMateriais ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorMateriais
						}
					},{
						ansName: 'ans:valorMedicamentos',
						edocName: 'valorMedicamentos',
						order: 5,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorMedicamentos ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorMedicamentos
						}
					},{
						ansName: 'ans:valorOPME',
						edocName: 'valorOPME',
						order: 6,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorOPME ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorOPME
						}
					},{
						ansName: 'ans:valorGasesMedicinais',
						edocName: 'valorGasesMedicinais',
						order: 7, 
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorGasesMedicinais ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorGasesMedicinais
						}
					},{
						ansName: 'ans:valorTotalGeral',
						edocName: 'valorTotalGeral',
						order: 8, 
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaSPSADT.valorTotal.valorTotalGeral
						}
					}]
				}]
			},{
				ansName: 'ans:guiaConsulta',
				edocName: 'guiaConsulta',
				order: 2,
				include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta ? 'include' : 'exclude',
				value: [{
					ansName: 'ans:cabecalhoConsulta',
					edocName: 'cabecalhoConsulta',
					order: 1,
					value: [{
						ansName: 'ans:registroANS',
						edocName: 'registroANS',
						order: 1,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.cabecalhoConsulta.registroANS
						}
					},{
						ansName: 'ans:numeroGuiaPrestador',
						edocName: 'numeroGuiaPrestador',
						order: 2,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.cabecalhoConsulta.numeroGuiaPrestador
						}
					}]
				},{
					ansName: 'ans:numeroGuiaOperadora',
					edocName: 'numeroGuiaOperadora',
					order: 2,
					include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.numeroGuiaOperadora ? 'include' : 'exclude',
					value: (validData)=>{
						return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.numeroGuiaOperadora
					} 
				},{
					ansName: 'ans:dadosBeneficiario',
					edocName: 'dadosBeneficiario',
					order: 3,
					value: [{
						ansName: 'ans:numeroCarteira',
						edocName: 'numeroCarteira',
						order: 1,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.dadosBeneficiario.numeroCarteira
						}
					},{
						ansName: 'ans:atendimentoRN',
						edocName: 'atendimentoRN',
						order: 2, 
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.dadosBeneficiario.atendimentoRN
						}
					},{
						ansName: 'ans:nomeBeneficiario',
						edocName: 'nomeBeneficiario',
						order: 3,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.dadosBeneficiario.nomeBeneficiario
						}
					},{
						ansName: 'ans:numeroCNS',
						edocName: 'numeroCNS',
						order: 4,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.dadosBeneficiario.numeroCNS ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.dadosBeneficiario.numeroCNS
						}
					},{
						ansName: 'ans:identificadorBeneficiario',
						edocName: 'identificadorBeneficiario',
						order: 5,
						include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.dadosBeneficiario.identificadorBeneficiario ? 'include' : 'exclude',
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.dadosBeneficiario.identificadorBeneficiario
						}
					}]
				},{
					ansName: 'ans:contratadoExecutante',
					edocName: 'contratadoExecutante',
					order: 4, 
					value: [{
						ansName: (validData)=>{
							if(validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.contratadoExecutante.codigoPrestadorNaOperadora) return 'ans:codigoPrestadorNaOperadora'
							if(validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.contratadoExecutante.cpfContratado) return 'ans:cpfContratado'
							return 'ans:cnpjContratado'	
						},
						edocName: (validData)=>{
							if(validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.contratadoExecutante.codigoPrestadorNaOperadora) return 'codigoPrestadorNaOperadora'
							if(validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.contratadoExecutante.cpfContratado) return 'cpfContratado'
							return 'cnpjContratado'	
						},
						order: 1,
						value: (validData)=>{
							if(validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.contratadoExecutante.codigoPrestadorNaOperadora) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.contratadoExecutante.codigoPrestadorNaOperadora
							if(validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.contratadoExecutante.cpfContratado) return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.contratadoExecutante.cpfContratado
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.contratadoExecutante.cnpjContratado	
						}
					},{
						ansName: 'ans:nomeContratado',
						edocName: 'nomeContratado',
						order: 2,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.contratadoExecutante.nomeContratado
						}
					},{
						ansName: 'ans:CNES',
						edocName: 'CNES',
						order: 3,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.contratadoExecutante.CNES
						}
					}]
				},{
					ansName: 'ans:profissionalExecutante',
					edocName: 'profissionalExecutante',
					order: 5,
					value: [{
						ansName: 'ans:nomeProfissional',
						edocName: 'nomeProfissional',
						order: 1,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.profissionalExecutante.nomeProfissional
						}
					},{
						ansName: 'ans:conselhoProfissional',
						edocName: 'conselhoProfissional',
						order: 2,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.profissionalExecutante.conselhoProfissional
						}
					},{
						ansName: 'ans:numeroConselhoProfissional',
						edocName: 'numeroConselhoProfissional',
						order: 3,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.profissionalExecutante.numeroConselhoProfissional
						}
					},{
						ansName: 'ans:UF',
						edocName: 'UF',
						order: 4,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.profissionalExecutante.UF 
						}
					},{
						ansName: 'ans:CBOS',
						edocName: 'CBOS',
						order: 5,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.profissionalExecutante.CBOS
						}
					}]
				},{
					ansName: 'ans:indicacaoAcidente',
					edocName: 'indicacaoAcidente',
					order: 6,
					value: (validData)=>{
						return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.indicacaoAcidente
					}
				},{
					ansName: 'ans:dadosAtendimento',
					edocName: 'dadosAtendimento',
					order: 7,
					value: [{
						ansName: 'ans:dataAtendimento',
						edocName: 'dataAtendimento',
						order: 1,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.dadosAtendimento.dataAtendimento
						}
					},{
						ansName: 'ans:tipoConsulta',
						edocName: 'tipoConsulta',
						order: 2,
						value: (validData)=>{
							return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.dadosAtendimento.tipoConsulta
						}
					},{
						ansName: 'ans:procedimento',
						edocName: 'procedimento',
						order: 3,
						value: [{
							ansName: 'ans:codigoTabela',
							edocName: 'codigoTabela',
							order: 1,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.dadosAtendimento.procedimento.codigoTabela
							}
						},{
							ansName: 'ans:codigoProcedimento',
							edocName: 'codigoProcedimento',
							order: 2,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.dadosAtendimento.procedimento.codigoProcedimento
							}
						},{
							ansName: 'ans:valorProcedimento',
							edocName: 'valorProcedimento',
							order: 3,
							value: (validData)=>{
								return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.dadosAtendimento.procedimento.valorProcedimento
							}
						}]
					}]
				},{
					ansName: 'ans:observacao',
					edocName: 'observacao',
					order: 8,
					include: validData => validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.observacao ? 'include' : 'exclude',
					value: (validData)=>{
						return validData.prestadorParaOperadora.loteGuias.guiasTISS.guiaConsulta.observacao
					}
				}]
			}]
		}]
	}]
}]