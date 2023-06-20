// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

///<reference types="Cypress" />

 
describe('Central de Atendimento ao Cliente TAT', function() {
    const TresSegundos = 3000  

    beforeEach(function(){
      cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
      cy.visit('./src/index.html')
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
      const textoGrande = 'um dia friu um bom lugar pra ler um livro, o pensamento la em vc e sem vc n vivo, um dia triste toda fragilidade incide, e o pensamento la em vc e sem vc não vivo'
      
      cy.clock()
      cy.get('#firstName').type('Pedro', {delay: 0})
      cy.get('#lastName').type('Antônio', {delay: 0})
      cy.get('#email').type('antonio@gmail.com', {delay: 0})
      cy.get('#open-text-area').type(textoGrande, {delay: 0})
      
      cy.contains('button','Enviar').click()

      cy.get('.success').should('be.visible')

      cy.tick(TresSegundos)
      cy.get('.success').should('not.be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.clock()
      cy.get('#firstName').type('Pedro', {delay: 0})
      cy.get('#lastName').type('Antônio', {delay: 0})
      cy.get('#email').type('antonio@gmail,com', {delay: 0})
      cy.get('#open-text-area').type('Bom dia', {delay: 0})
      cy.contains('button','Enviar').click()

      cy.get('.error').should('be.visible')
      cy.tick(TresSegundos)
      cy.get('.error').should('not.be.visible')
    })
    it('telefone teste', function(){
      cy.get('#phone').type('teste')
      cy.get('#phone').should('have.value','')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      cy.get('#phone').type('1199999999').should('have.value', '1199999999')
      cy.get('#firstName').type('Pedro').should('have.value', 'Pedro')
      cy.get('#lastName').type('Antônio').should('have.value', 'Antônio')
      cy.get('#email').type('antonio@gmail.com').should('have.value', 'antonio@gmail.com')
      cy.get('#open-text-area').type('Bom dia').should('have.value', 'Bom dia')

      cy.get('#firstName').clear().should('have.value', '')
      cy.get('#lastName').clear().should('have.value', '')
      cy.get('#email').clear().should('have.value', '')
      cy.get('#open-text-area').clear().should('have.value', '')
      cy.get('#phone').type('1199999999').clear().should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.clock()
      cy.get('#phone-checkbox').check()
      cy.get('#phone').type('999999m')
      cy.contains('button','Enviar').click()

      cy.get('.error').should('be.visible')
      cy.tick(TresSegundos)
      cy.get('.error').should('not.be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
      cy.clock()
      cy.contains('button','Enviar').click()

      cy.get('.error').should('be.visible')
      cy.tick(TresSegundos)
      cy.get('.error').should('not.be.visible')
    })
    it('envia um formulário com sucesso usando um comando customizado', function(){
      cy.clock()
      cy.fillMandatoryFieldsAndSubmit()

      cy.success()
      cy.tick(TresSegundos)
      cy.fail()
    })
    it('seleciona um produto (YouTube) por seu texto',function(){
      cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
      cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product')
        .select(1)
        .should('have.value','blog')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value','feedback')
    })
    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último',function(){
      cy.get('input[type="checkbox"]')
        .should('have.length',2)
        .check()
        .should('be.checked')
        .last()
          .uncheck()
          .should('not.be.checked')
    })
    Cypress._.times(3, function(){
      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#phone-checkbox').check()
        cy.contains('button','Enviar').click()
        cy.get('#firstName').type('Pedro', {delay: 0})
        cy.get('#lastName').type('Antônio', {delay: 0})
        cy.get('#email').type('antonio@gmail.com', {delay: 0})
        cy.get('#open-text-area').type('teste', {delay: 0})
        cy.contains('button','Enviar').click()
  
        cy.get('.error').should('be.visible')
      })
    })
    it('seleciona um arquivo da pasta fixtures',function(){
      cy.get('input[type="file"]')
        .selectFile('./cypress/fixtures/example.json')

        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop',function(){
      cy.get('input[type="file"]')
        .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
      cy.fixture('example.json').as('aliasTeste')
      cy.get('input[type="file"]')
        .selectFile('@aliasTeste')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
      cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    })
    it('testa a página da política de privacidade de forma independente',function(){
      cy.get('a[href="privacy.html"]')
        .invoke('removeAttr', 'target')
        .click()
          //cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', function(){
      const TextoGrande = Cypress._.repeat('Olá Mundo', 20)

      cy.get('#open-text-area')
        .invoke('val',TextoGrande)
        .should('have.value', TextoGrande)
    })

    it('faz uma requisição HTTP', function(){
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')  
        .should(function(response){
          const { status, statusText, body} = response
          expect(status).to.equal(200)
          expect(statusText).to.equal('OK')
          expect(body).to.include('CAC TAT')
        })
    })

    it('Encontra um gato', function(){
      cy.get('#cat')
        .invoke('show')
        .should('be.visible')
    })
  })
