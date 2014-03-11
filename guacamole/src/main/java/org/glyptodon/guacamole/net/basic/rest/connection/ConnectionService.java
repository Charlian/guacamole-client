/*
 * Copyright (C) 2014 Glyptodon LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

package org.glyptodon.guacamole.net.basic.rest.connection;

import java.util.ArrayList;
import java.util.List;
import org.glyptodon.guacamole.GuacamoleException;
import org.glyptodon.guacamole.net.auth.Connection;
import org.glyptodon.guacamole.net.auth.Directory;

/**
 * A service for performing useful manipulations on REST Connections.
 * 
 * @author James Muehlner
 */
public class ConnectionService {
    
    /**
     * Converts a Connection Directory to a list of APIConnection objects for 
     * exposing with the REST endpoints.
     * 
     * @param connectionDirectory The Connection Directory to convert for REST endpoint use.
     * @return A List of APIConnection objects for use with the REST endpoint.
     * @throws GuacamoleException If an error occurs while converting the 
     *                            connection directory.
     */
    public List<APIConnection> convertConnectionList(Directory<String, Connection> connectionDirectory) 
            throws GuacamoleException {
        List<APIConnection> restConnections = new ArrayList<APIConnection>();
        
        for(String connectionID : connectionDirectory.getIdentifiers()) {
            restConnections.add(new APIConnection(connectionDirectory.get(connectionID)));
        }
            
        return restConnections;
    }
}
