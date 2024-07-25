const request = require('supertest');
const app = require('../app.js');

describe('User API', () => {

    it('should list all posts', async () => {
        const res = await request(app).get(`/api/posts`);
        expect(res.statusCode).toBe(200);
    });

    it('should list all posts by admin', async () => {
        const res = await request(app).get(`/api/posts/admin`);
        expect(res.statusCode).toBe(200);
    });

    it('should create a new post', async () => {
        const postData = {  titulo: 'novo titulo', descricao: 'novo descricao', conteudo:'novo conteudo', imagem: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUwAAAB3CAYAAABopHmFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAACBdSURBVHhe7Z0LXBZV+sd/maCEhIIJyIfysl5LCFFLbdMu2oYF7G4X7X5bofxsa1v6r20V7fK'};
        const response = await request(app).post('/api/posts').send(postData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe("Post Criado com Sucesso!");
    });

    it('should retrieve an existing post by id', async () => {
        const postData = { id: 20, titulo: 'Titulo_20', descricao: 'Descricao_20', imagem: null};
        const postId = 20;

        const res = await request(app).get(`/api/posts/${postId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining(postData));
    });

    it('should edit a post', async () => {        
        const updatedPostData = { titulo: 'test titulo updated', descricao: 'test descricao updated', conteudo:'test conteudo updated', imagem: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUwAAAB3CAYAAABopHmFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAACBdSURBVHhe7Z0LXBZV+sd/maCEhIIJyIfysl5LCFFLbdMu2oYF7G4X7X5bofxsa1v6r20V7fK'};
        const response = await request(app).put('/api/posts/10').send(updatedPostData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe("Post Atualizado com sucesso!");
    });

    it('should delete a post', async () => {        
        const response = await request(app).delete('/api/posts/11');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe("Post Deletado com Sucesso!");
    });

    it('should return posts that contain the keyword', async () => {        
        const response = await request(app).get('/api/posts/search?buscar=Titulo');
        expect(response.statusCode).toBe(200);
    });

});