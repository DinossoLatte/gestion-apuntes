package dinossolatte.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Subject.
 */
@Entity
@Table(name = "subject")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Subject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "initials")
    private String initials;

    @OneToMany(mappedBy = "subject")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Folder> folders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public Subject fullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getInitials() {
        return initials;
    }

    public Subject initials(String initials) {
        this.initials = initials;
        return this;
    }

    public void setInitials(String initials) {
        this.initials = initials;
    }

    public Set<Folder> getFolders() {
        return folders;
    }

    public Subject folders(Set<Folder> folders) {
        this.folders = folders;
        return this;
    }

    public Subject addFolders(Folder folder) {
        this.folders.add(folder);
        folder.setSubject(this);
        return this;
    }

    public Subject removeFolders(Folder folder) {
        this.folders.remove(folder);
        folder.setSubject(null);
        return this;
    }

    public void setFolders(Set<Folder> folders) {
        this.folders = folders;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Subject subject = (Subject) o;
        if (subject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", fullName='" + getFullName() + "'" +
            ", initials='" + getInitials() + "'" +
            "}";
    }
}
