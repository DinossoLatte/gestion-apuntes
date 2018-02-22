package dinossolatte.web.rest;

import dinossolatte.ApuntesApp;

import dinossolatte.domain.Data;
import dinossolatte.repository.DataRepository;
import dinossolatte.service.DataService;
import dinossolatte.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static dinossolatte.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DataResource REST controller.
 *
 * @see DataResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ApuntesApp.class)
public class DataResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_FULL_PATH = "AAAAAAAAAA";
    private static final String UPDATED_FULL_PATH = "BBBBBBBBBB";

    private static final Integer DEFAULT_SIZE = 1;
    private static final Integer UPDATED_SIZE = 2;

    private static final Instant DEFAULT_CREATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private DataRepository dataRepository;

    @Autowired
    private DataService dataService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDataMockMvc;

    private Data data;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DataResource dataResource = new DataResource(dataService);
        this.restDataMockMvc = MockMvcBuilders.standaloneSetup(dataResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Data createEntity(EntityManager em) {
        Data data = new Data()
            .name(DEFAULT_NAME)
            .fullPath(DEFAULT_FULL_PATH)
            .size(DEFAULT_SIZE)
            .creationDate(DEFAULT_CREATION_DATE);
        return data;
    }

    @Before
    public void initTest() {
        data = createEntity(em);
    }

    @Test
    @Transactional
    public void createData() throws Exception {
        int databaseSizeBeforeCreate = dataRepository.findAll().size();

        // Create the Data
        restDataMockMvc.perform(post("/api/data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(data)))
            .andExpect(status().isCreated());

        // Validate the Data in the database
        List<Data> dataList = dataRepository.findAll();
        assertThat(dataList).hasSize(databaseSizeBeforeCreate + 1);
        Data testData = dataList.get(dataList.size() - 1);
        assertThat(testData.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testData.getFullPath()).isEqualTo(DEFAULT_FULL_PATH);
        assertThat(testData.getSize()).isEqualTo(DEFAULT_SIZE);
        assertThat(testData.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
    }

    @Test
    @Transactional
    public void createDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataRepository.findAll().size();

        // Create the Data with an existing ID
        data.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataMockMvc.perform(post("/api/data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(data)))
            .andExpect(status().isBadRequest());

        // Validate the Data in the database
        List<Data> dataList = dataRepository.findAll();
        assertThat(dataList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllData() throws Exception {
        // Initialize the database
        dataRepository.saveAndFlush(data);

        // Get all the dataList
        restDataMockMvc.perform(get("/api/data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(data.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].fullPath").value(hasItem(DEFAULT_FULL_PATH.toString())))
            .andExpect(jsonPath("$.[*].size").value(hasItem(DEFAULT_SIZE)))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())));
    }

    @Test
    @Transactional
    public void getData() throws Exception {
        // Initialize the database
        dataRepository.saveAndFlush(data);

        // Get the data
        restDataMockMvc.perform(get("/api/data/{id}", data.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(data.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.fullPath").value(DEFAULT_FULL_PATH.toString()))
            .andExpect(jsonPath("$.size").value(DEFAULT_SIZE))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingData() throws Exception {
        // Get the data
        restDataMockMvc.perform(get("/api/data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateData() throws Exception {
        // Initialize the database
        dataService.save(data);

        int databaseSizeBeforeUpdate = dataRepository.findAll().size();

        // Update the data
        Data updatedData = dataRepository.findOne(data.getId());
        // Disconnect from session so that the updates on updatedData are not directly saved in db
        em.detach(updatedData);
        updatedData
            .name(UPDATED_NAME)
            .fullPath(UPDATED_FULL_PATH)
            .size(UPDATED_SIZE)
            .creationDate(UPDATED_CREATION_DATE);

        restDataMockMvc.perform(put("/api/data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedData)))
            .andExpect(status().isOk());

        // Validate the Data in the database
        List<Data> dataList = dataRepository.findAll();
        assertThat(dataList).hasSize(databaseSizeBeforeUpdate);
        Data testData = dataList.get(dataList.size() - 1);
        assertThat(testData.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testData.getFullPath()).isEqualTo(UPDATED_FULL_PATH);
        assertThat(testData.getSize()).isEqualTo(UPDATED_SIZE);
        assertThat(testData.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingData() throws Exception {
        int databaseSizeBeforeUpdate = dataRepository.findAll().size();

        // Create the Data

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDataMockMvc.perform(put("/api/data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(data)))
            .andExpect(status().isCreated());

        // Validate the Data in the database
        List<Data> dataList = dataRepository.findAll();
        assertThat(dataList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteData() throws Exception {
        // Initialize the database
        dataService.save(data);

        int databaseSizeBeforeDelete = dataRepository.findAll().size();

        // Get the data
        restDataMockMvc.perform(delete("/api/data/{id}", data.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Data> dataList = dataRepository.findAll();
        assertThat(dataList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Data.class);
        Data data1 = new Data();
        data1.setId(1L);
        Data data2 = new Data();
        data2.setId(data1.getId());
        assertThat(data1).isEqualTo(data2);
        data2.setId(2L);
        assertThat(data1).isNotEqualTo(data2);
        data1.setId(null);
        assertThat(data1).isNotEqualTo(data2);
    }
}
