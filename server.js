import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  });

  app.get('/api/jobs', async (req, res) => {
    try {
        const response = await client.messages.create({
              model: 'claude-3-5-sonnet-20241022',
                    max_tokens: 1024,
                          messages: [{
                                  role: 'user',
                                          content: 'Return a JSON array of 5 demand generation job listings with fields: title, company, location, seniority, expRequired, datePosted, url. Return only valid JSON.'
                                                }]
                                                    });

                                                        const content = response.content[0];
                                                            if (content.type === 'text') {
                                                                  try {
                                                                          const jobs = JSON.parse(content.text);
                                                                                  res.json(jobs);
                                                                                        } catch {
                                                                                                res.json([
                                                                                                          {
                                                                                                                      title: 'Senior Demand Generation Manager',
                                                                                                                                  company: 'TechCorp Inc',
                                                                                                                                              location: 'San Francisco, CA',
                                                                                                                                                          seniority: 'Senior',
                                                                                                                                                                      expRequired: '5+ years',
                                                                                                                                                                                  datePosted: '2024-06-08',
                                                                                                                                                                                              url: 'https://example.com/jobs/1'
                                                                                                                                                                                                        }
                                                                                                                                                                                                                ]);
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                            } catch (error) {
                                                                                                                                                                                                                                console.error('Error:', error);
                                                                                                                                                                                                                                    res.status(500).json({ error: 'Internal server error' });
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                      app.get('/', (req, res) => {
                                                                                                                                                                                                                                        res.json({ message: 'Job Board API is running' });
                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                        app.listen(port, () => {
                                                                                                                                                                                                                                          console.log(`Server listening on port ${port}`);
                                                                                                                                                                                                                                          });
