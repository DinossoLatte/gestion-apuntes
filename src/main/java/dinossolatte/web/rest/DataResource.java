package dinossolatte.web.rest;

import com.codahale.metrics.annotation.Timed;
import dinossolatte.domain.Data;
import dinossolatte.service.DataService;
import dinossolatte.web.rest.errors.BadRequestAlertException;
import dinossolatte.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Data.
 */
@RestController
@RequestMapping("/api")
public class DataResource {

    private final Logger log = LoggerFactory.getLogger(DataResource.class);

    private static final String ENTITY_NAME = "data";

    private final DataService dataService;

    public DataResource(DataService dataService) {
        this.dataService = dataService;
    }

    /**
     * POST  /data : Create a new data.
     *
     * @param data the data to create
     * @return the ResponseEntity with status 201 (Created) and with body the new data, or with status 400 (Bad Request) if the data has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/data")
    @Timed
    public ResponseEntity<Data> createData(@RequestBody Data data) throws URISyntaxException {
        log.debug("REST request to save Data : {}", data);
        if (data.getId() != null) {
            throw new BadRequestAlertException("A new data cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Data result = dataService.save(data);
        return ResponseEntity.created(new URI("/api/data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /data : Updates an existing data.
     *
     * @param data the data to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated data,
     * or with status 400 (Bad Request) if the data is not valid,
     * or with status 500 (Internal Server Error) if the data couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/data")
    @Timed
    public ResponseEntity<Data> updateData(@RequestBody Data data) throws URISyntaxException {
        log.debug("REST request to update Data : {}", data);
        if (data.getId() == null) {
            return createData(data);
        }
        Data result = dataService.save(data);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, data.getId().toString()))
            .body(result);
    }

    /**
     * GET  /data : get all the data.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of data in body
     */
    @GetMapping("/data")
    @Timed
    public List<Data> getAllData() {
        log.debug("REST request to get all Data");
        return dataService.findAll();
        }

    /**
     * GET  /data/:id : get the "id" data.
     *
     * @param id the id of the data to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the data, or with status 404 (Not Found)
     */
    @GetMapping("/data/{id}")
    @Timed
    public ResponseEntity<Data> getData(@PathVariable Long id) {
        log.debug("REST request to get Data : {}", id);
        Data data = dataService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(data));
    }

    /**
     * DELETE  /data/:id : delete the "id" data.
     *
     * @param id the id of the data to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/data/{id}")
    @Timed
    public ResponseEntity<Void> deleteData(@PathVariable Long id) {
        log.debug("REST request to delete Data : {}", id);
        dataService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
